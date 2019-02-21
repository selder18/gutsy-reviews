const merge = require('webpack-merge'); //eslint-disable-line
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); //eslint-disable-line
const MinifyPlugin = require('babel-minify-webpack-plugin'); //eslint-disable-line
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //eslint-disable-line
const CompressionPlugin = require('compression-webpack-plugin'); //eslint-disable-line
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [new CompressionPlugin()],
  devtool: '',

});
