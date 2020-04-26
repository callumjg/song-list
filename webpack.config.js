const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const NodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const Nodemon = require('nodemon-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopmressionPlugin = require('compression-webpack-plugin');

const src = path.resolve(__dirname, 'src');

const makeConfig = (name) => (env) => {
  const isServer = name === 'server';
  const isProduction = !!env.production;
  let plugins = isServer
    ? [
        new Nodemon({
          script: './dist/server.js',
          watch: path.resolve(__dirname, './dist'),
        }),
      ]
    : [
        new HtmlWebpackPlugin({
          template: __dirname + '/src/server/public/index.html',
          favicon: __dirname + '/src/server/public/favicon.ico',
          filename: 'template.html',
        }),
      ];

  if (!isProduction && isServer) {
    plugins.push(new Dotenv());
    plugins.push(new CleanWebpackPlugin());
  }

  if (isProduction && !isServer) {
    plugins = [
      ...plugins,
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
    ];
  }

  const rules = [
    {
      test: /\.tsx?$/,
      include: src,
      use: ['ts-loader'],
      include: src,
    },
    {
      test: /\.jsx?$/,
      include: src,
      use: ['babel-loader'],
      include: src,
    },
    {
      test: /\.(s[ac]|c)ss$/i,
      use: isServer
        ? 'ignore-loader'
        : ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: 'file-loader',
      include: src,
    },
  ];

  if (!isProduction) {
    rules.push({
      enforce: 'pre',
      test: /\.js$/,
      use: 'source-map-loader',
    });
    rules[0].use = [...rules[0].use, 'eslint-loader'];
  }

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      [name]: `${__dirname}/src/${name}/${isServer ? 'index.js' : 'index.tsx'}`,
    },
    output: {
      filename: '[name].js',
      path: isServer ? __dirname + '/dist' : __dirname + '/dist/public',
      publicPath: isServer ? '/public' : '/',
    },
    module: {
      rules,
    },
    devtool: isProduction ? undefined : 'source-maps',
    plugins,
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      symlinks: false,
      cacheWithContext: false,
    },
    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '.cache'),
      buildDependencies: {
        config: [__filename],
      },
    },
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
    externals: isServer ? [new NodeExternals()] : [],
    target: isServer ? 'node' : 'web',
    node: {
      __dirname: true,
    },
  };
};

module.exports = [makeConfig('server'), makeConfig('client')];
