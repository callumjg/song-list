const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const NodeExternals = require('webpack-node-externals');
const Nodemon = require('nodemon-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopmressionPlugin = require('compression-webpack-plugin');
const src = path.resolve(__dirname, 'src');
const { merge } = require('webpack-merge');

const shared = (env) => {
  const isProduction = !!env.production;

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? undefined : 'source-maps',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      symlinks: false,
      cacheWithContext: false,
    },
    node: {
      __dirname: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: src,
          use: isProduction ? 'ts-loader' : ['ts-loader', 'eslint-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          use: ['babel-loader'],
          include: src,
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: 'file-loader',
          include: src,
          exclude: /node_modules/,
        },
        ...(isProduction
          ? []
          : [
              {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader',
                include: src,
                exclude: /node_modules/,
              },
            ]),
      ],
    },
  };
};

const server = (env) => {
  const config = {
    name: 'server',
    entry: `${__dirname}/src/server/index.ts`,
    output: {
      filename: 'server.js',
      path: __dirname + '/dist/',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(s[ac]|c)ss$/i,
          use: 'ignore-loader',
        },
      ],
    },
    externals: [new NodeExternals()],
    target: 'node',
    plugins: [
      new Nodemon({
        script: './dist/server.js',
        watch: path.resolve(__dirname, './dist'),
        nodeArgs: ['-r', 'dotenv/config'],
      }),
      new webpack.IgnorePlugin(/\.\/locale$/, /moment$/),
      new CleanWebpackPlugin(),
    ],
  };

  return merge(shared(env), config);
};

const client = (env) => {
  const isProduction = !!env.production;
  const config = {
    name: 'client',
    entry: `${__dirname}/src/client/index.tsx`,
    output: {
      filename: 'client.js',
      path: __dirname + '/dist/public/',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(s[ac]|c)ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    target: 'web',
    plugins: [
      new webpack.IgnorePlugin(/\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        template: __dirname + '/src/server/public/index.html',
        favicon: __dirname + '/src/server/public/favicon.ico',
        filename: 'template.html',
      }),
      ...(isProduction
        ? [
            new CopmressionPlugin({
              filename: '[path].br[query]',
              algorithm: 'brotliCompress',
              test: /\.(js|css|html|svg)$/,
              compressionOptions: { level: 11 },
              threshold: 10240,
              minRatio: 0.8,
              cache: true,
            }),
            new CopmressionPlugin({
              filename: '[path].gz[query]',
              algorithm: 'gzip',
              test: /\.js$|\.css$|\.html$/,
              threshold: 10240,
              minRatio: 0.8,
              cache: true,
              deleteOriginalAssets: true,
            }),
          ]
        : []),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
  };
  return merge(shared(env), config);
};

module.exports = [client, server];

// module.exports = [makeConfig('server'), makeConfig('client')];
