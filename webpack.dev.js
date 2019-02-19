const merge = require('webpack-merge'); //eslint-disable-line
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.AXIOS_LOCATION': JSON.stringify('') })
  ]
});
