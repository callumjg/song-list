const HtmlWebpackPlugin = require("html-webpack-plugin");
const chalk = require("chalk");
const path = require("path");
const entry = path.resolve(__dirname, "src", "client", "index.tsx");
const assets = path.resolve(__dirname, "src", "client", "public");

module.exports = {
  entry,
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
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
        use: "file-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: "source-map-loader"
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
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: assets + "/index.html",
      favicon: assets + "/favicon.ico"
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
