'use strict';
let path = require('path');
const config = {
  //devtool: 'eval-source-map',
  entry: __dirname+'/client/app.jsx',
  output: {
    path: __dirname,
    file: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        query: {
          presets: ['react','es2015']
        }
      }
    ]
  }
};
module.exports = config;