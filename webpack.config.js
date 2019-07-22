const path = require("path");
const zlib = require("zlib");
const pjson = require("./package.json");

const chokidar = require("chokidar");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";
const options = {
  target:
    (pjson.themeConf && pjson.themeConf.proxyTarget) || "http://localhost:8000",
  host: (pjson.themeConf && pjson.themeConf.host) || "localhost",
  port: (pjson.themeConf && pjson.themeConf.port) || 8080,
  publicPath: `/wp-content/themes/${path.basename(path.resolve())}`
};

console.log(`devMode: ${devMode}`);
console.log(`Target: ${options.target}`);
console.log(`Host: ${options.host}`);
console.log(`Port: ${options.port}`);

const proxyRes = (proxyRes, req, res) => {
  let body = new Buffer.from("");
  proxyRes.on("data", data => {
    body = Buffer.concat([body, data]);
  });
  proxyRes.on("end", () => {
    const encoding = proxyRes.headers["content-encoding"] || "";
    const type = proxyRes.headers["content-type"] || "";
    delete proxyRes.headers["x-powered-by"];

    if (type.includes("text/html")) {
      const ungzip = new Promise((resolve, reject) => {
        if (encoding === "gzip") {
          zlib.gunzip(body, (err, dezipped) => {
            body = dezipped;
            delete proxyRes.headers["content-encoding"];
            if (err) reject(err);
            resolve();
          });
        } else {
          resolve();
        }
      });
      ungzip
        .then(() => {
          const re = new RegExp(options.target, "g");
          body = body
            .toString("utf-8")
            .replace(re, `http://${options.host}:${options.port}`);
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          res.end(body);
        })
        .catch(err => {
          res.end(err);
        });
    } else {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      res.end(body);
    }
  });
};

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/javascripts/main.js",
  devtool: "source-map",
  output: {
    publicPath: `${options.publicPath}/assets/`,
    path: path.resolve(__dirname, "assets"),
    filename: "main.bundle.js"
  },
  devServer: {
    before: (app, server) => {
      const files = ["**/*.php"];

      chokidar
        .watch(files, {
          alwaysStat: true,
          atomic: false,
          followSymlinks: false,
          ignoreInitial: true,
          ignorePermissionErrors: true
        })
        .on("all", () => {
          server.sockWrite(server.sockets, "content-changed");
        });
    },
    publicPath: `${options.publicPath}/assets/`,
    clientLogLevel: "silent",
    hot: true,
    inline: true,
    compress: true,
    port: options.port,
    host: options.host,
    proxy: {
      "**": {
        selfHandleResponse: true,
        target: options.target,
        changeOrigin: true,
        onProxyRes: proxyRes
      }
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [new MiniCssExtractPlugin({})],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode
            }
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
