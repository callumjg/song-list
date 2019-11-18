const HtmlWebpackPlugin = require("html-webpack-plugin");
const chalk = require("chalk");
const path = require("path");
const entry = path.resolve(__dirname, "src", "client", "index.js");
const assets = path.resolve(__dirname, "src", "client", "public");

module.exports = {
  entry,
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader"
      }
    ]
  },
  devtool: "source-map", //enum
  devServer: {
    proxy: {
      "/api": "http://localhost:3001"
    },
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/",
    compress: true,
    historyApiFallback: true,
    port: 3000,
    after: function() {
      console.log(
        `Development server for client listening on ${chalk.green(this.port)}`
      );
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: assets + "/index.html",
      favicon: assets + "/favicon.ico"
    })
  ]
};
