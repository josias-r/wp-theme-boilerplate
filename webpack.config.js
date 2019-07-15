const path = require("path");
const pjson = require("./package.json");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const options = {
  publicPath: `/wp-content/themes/${path.basename(path.resolve())}`
};

module.exports = {
  mode: "development",
  entry: "./src/javascripts/main.js",
  devtool: "source-map",
  output: {
    publicPath: `${options.publicPath}/assets/`,
    path: path.resolve(__dirname, "assets"),
    filename: "main.bundle.js"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      port: pjson.themeConf.port || 3000,
      proxy: pjson.themeConf.proxyURL || "localhost:8000",
      files: ["**.php"]
    }),
    new MiniCssExtractPlugin({})
  ],
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
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
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
