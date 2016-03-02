'use strict';
let path = require('path');
let webpack = require('webpack');

const config = {
  devtool: 'cheap-module-source-map',
  entry: __dirname+'/client/app.jsx',
  output: {
    path: __dirname,
    file: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      preserveComments: false,
      screwIE8: true

    })
  ],
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        query: {
          presets: ['react','es2015'],
          compact : false
        }
      }
    ]
  }
};
module.exports = config;
