const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const webpack = require("webpack");

module.exports = {
  entry: "./src/javascripts/main.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.bundle.js"
  },
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:8000",
        changeOrigin: true
      }
    }
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
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
            loader: "css-loader",
            options: { importLoaders: 2 }
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  }
};
