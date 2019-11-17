const HtmlWebpackPlugin = require("html-webpack-plugin");
const chalk = require("chalk");
const PUBLIC_DIR = __dirname + "/src/client/public";

module.exports = env => ({
  mode: env.NODE_ENV,
  entry: __dirname + "/src/client/index.js",
  output: {
    path: __dirname + "/build",
    filename: "index.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          },
          {
            loader: "eslint-loader"
          }
        ]
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
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  devtool: "source-map", //enum
  context: __dirname, // string (absolute path!)
  target: "web", // enum
  devServer: {
    proxy: {
      "/api": "http://localhost:3001"
    },
    contentBase: __dirname + "/src/server/public", // boolean | string | array, static file location
    publicPath: "/",
    compress: true, // enable gzip compression
    historyApiFallback: {
      rewrites: [
        {
          from: /\.js/,
          to: context => context.parsedUrl.href.match(/\/[^/]+\.js$/)[0]
        },
        { from: /./, to: "/" }
      ],
      disableDotRule: true
    },
    port: 3000,
    after: function() {
      console.log(
        `Development server for client listening on ${chalk.green(this.port)}`
      );
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PUBLIC_DIR + "/index.html",
      favicon: PUBLIC_DIR + "/favicon.ico"
    })
  ]
});
