const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopmressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackChangeAssetsExtensionPlugin = require("html-webpack-change-assets-extension-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const publicAssets = path.resolve(__dirname, "src", "client", "public");

// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
module.exports = {
  entry: path.resolve(__dirname, "src", "client", "index.tsx"),
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  devtool: process.env.WEBPACK_DEV_SERVER ? "source-map" : "",
  devServer: {
    proxy: {
      "/api": "http://localhost:3001"
    },
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/",
    compress: true,
    port: 3000,
    historyApiFallback: true,
    host: "0.0.0.0"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: publicAssets + "/index.html",
      favicon: publicAssets + "/favicon.ico",
      minify: {
        collapseWhitespace: true
      }
    }),
    new CopmressionPlugin({
      filename: "[path].br[query]",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8
    }),
    new CopmressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CleanWebpackPlugin()
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
