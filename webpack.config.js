const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './lib/melonJS.js',
    './lib/plugins/debugPanel.js',
    './js/game.js'
  ],
  output: {
    path: __dirname,
    filename: 'build/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.html/, loader: 'file-loader'
    }, {
      text: /\.js$/,
      include: path.join(__dirname, 'js'),
      loader: 'babel-loader'
    }, {
      text: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules|lib/
    }]
  }
};
