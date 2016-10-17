const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const isProd = (process.env.NODE_ENV === 'production')

const srcPath = path.resolve(__dirname, '..', 'lib')
const sassLoaders = [
  'css-loader?sourceMap',
  'sass-loader?sourceMap&includePaths[]=' + srcPath
]
const plugins = [
  new ExtractTextPlugin("[name].css"),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  })
]

if (isProd) {
  plugins.push(new webpack.optimize.OccurenceOrderPlugin())
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
    }
  }))
  plugins.push(new webpack.optimize.DedupePlugin())
}

module.exports = {
  devtool: isProd ? null : "inline-source-map" ,
  entry: [
    './client/lib/index'
  ],
  output: {
    path: path.join(__dirname, '..', '..', 'public'),
    filename: '[name].js',
    publicPath: '/public/'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [srcPath]
  },
  watchOptions: {
    poll: 2000
  }
}
