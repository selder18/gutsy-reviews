const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  plugins: [new BundleAnalyzerPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-flow'],
          'retainLines': true,
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
