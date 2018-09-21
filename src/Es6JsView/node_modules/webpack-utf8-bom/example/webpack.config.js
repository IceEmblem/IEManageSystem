var path = require('path');
var webpack = require('webpack');
var BomPlugin = require('../webpack-utf8-bom');

var srcPath = './src/';
var libPath = './node_modules';

module.exports = {
  entry: {
    test: './test'
    },
    
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].js'
  },

  plugins: [
    new BomPlugin(true)
  ],


  module: {
    loaders: [

    ],
  },

  resolve: {
    root: [srcPath, libPath],
    extensions: ['', '.js', '.jsx', '.coffee', '.html', '.css', '.scss'],
    
  }
};
