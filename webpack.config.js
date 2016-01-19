var path = require('path')
var webpack = require('webpack')
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var data = require('./data')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    'main': './src/main.js'
  },
  output: {
    path: __dirname+"/_site",
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.jade$/,
        loader: "jade-loader?self"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.styl$/,
        loader: 'css-loader!stylus-loader!postcss-loader'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new StaticSiteGeneratorPlugin('main', data.routes(), data)
  ]
}
