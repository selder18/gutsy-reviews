const merge = require('webpack-merge'); //eslint-disable-line
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); //eslint-disable-line
const MinifyPlugin = require('babel-minify-webpack-plugin'); //eslint-disable-line
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //eslint-disable-line
const CompressionPlugin = require('compression-webpack-plugin'); //eslint-disable-line
// const path = require('path');
const common = require('./webpack.common');

// const SRC_DIR = path.join(__dirname, '/client/src');

module.exports = merge(common, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin(),
    // new MinifyPlugin({}, {
    //   test: /\.jsx?/,
    //   include: SRC_DIR
    // }),
    new CompressionPlugin({
      // test: /\.jsx?/,
      // algorithm: 'gzip',
      // include: SRC_DIR,
      // threshold: 10240,
      // minRatio: 0.8
    })
  ],
  devtool: '',

});
