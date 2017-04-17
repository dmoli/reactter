// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssModules = 'modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'

module.exports = {
  // extensions of the files that webpack will to watch
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // fix issues external project dependencies
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  // entry point
  entry: [`${__dirname}/src/index.jsx`],
  // out point
  output: {
    filename: 'app.js', // final file
    path: `${__dirname}/build`, // final bundler
    publicPath: '/'
  },
  // load all the presets
  module: {
    loaders: [
      // ES2015 to ES5
      {
        test: /(\.js|jsx)$/, // extensions to transpile
        exclude: /node_modules/, // not transpile this folder
        loaders: ['babel-loader'] // transpile with babel
      },
      // css
      {
        test: /\.css$/,
        loader: `style-loader!css-loader?${cssModules}` // ! is for concat loaders
      }
    ]
  },
  // create server
  devServer: {
    host: '0.0.0.0',
    port: 5555,
    inline: true
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({ template: `${__dirname}/src/assets/index.html` }), // use this template
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true }) // export all modules in style.css
  ]
}
