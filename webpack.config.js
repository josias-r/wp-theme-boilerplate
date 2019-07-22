const path = require("path");
const zlib = require("zlib");
const pjson = require("./package.json");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";
const options = {
  target:
    (pjson.themeConf && pjson.themeConf.proxyURL) || "http://localhost:8000",
  port: pjson.themeConf && pjson.themeConf.port,
  publicPath: `/wp-content/themes/${path.basename(path.resolve())}`
};

console.log("devMode: " + devMode);

const proxyRes = (proxyRes, req, res) => {
  let body = new Buffer.from("");
  proxyRes.on("data", data => {
    body = Buffer.concat([body, data]);
  });
  proxyRes.on("end", () => {
    let encoding;
    let type;
    if (proxyRes.headers) {
      encoding =
        proxyRes.headers["content-encoding"] ||
        proxyRes.headers["Content-Encoding"];
      type =
        proxyRes.headers["content-type"] || proxyRes.headers["Content-Type"];
    }

    if (encoding === "gzip" && (type && type.includes("text/html"))) {
      zlib.gunzip(body, function(err, dezipped) {
        body = dezipped.toString("utf-8");
        res.writeHead(200, {
          "Content-Type": "text/html; charset=UTF-8"
        });
        body = body.replace(/localhost:8000/g, `localhost:${options.port}`);
        res.end(body);
      });
    } else {
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
    publicPath: `${options.publicPath}/assets/`,
    clientLogLevel: "silent",
    hot: true,
    inline: true,
    compress: true,
    port: options.port,
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
