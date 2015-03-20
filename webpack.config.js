var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var _ = require('lodash');
var path = require('path');

var vendors = _.keys(require('./package.json').dependencies);
vendors = _.without(vendors, 'semantic-ui-css');

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      path.join(__dirname, 'app', 'app.js'),
      path.join(__dirname, 'app', 'app.sass')
    ],
    vendor: vendors
  },
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.sass/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?indentedSyntax&outputStyle=compressed')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?optional=react'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader'
      }
    ],
    preLoaders: [
      {
        test:    /\.js$/,
        exclude: /node_modules/,
        loader: 'jscs-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
};
