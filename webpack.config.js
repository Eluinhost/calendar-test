var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var _ = require('lodash');
var path = require('path');

var vendors = _.keys(require('./package.json').dependencies);
vendors = _.without(vendors, 'semantic-ui-css');

module.exports = {
  entry: {
    app: path.join(__dirname, 'app', 'app.js'),
    vendor: vendors
  },
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jsx-loader?harmony'
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
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
