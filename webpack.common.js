const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');
const exclude = [
  path.join(__dirname, './makeSeed.js'),
  path.join(__dirname, './knex/seeds')
];

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        exclude,
        include: SRC_DIR,
        test: /\.jsx?/,
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
