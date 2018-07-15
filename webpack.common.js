const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  output: {
    path: resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CopyWebpackPlugin([{
      from: resolve(__dirname, 'static/')
    }])
  ],
  module: {
    // rules: [{
    //     test: /\.txt$/,
    //     use: 'raw-loader'
    //   }]
  },
  resolve: {
    alias: {
      '@functions': resolve(__dirname, 'functions/'),
      '@root': __dirname,
      '@config': resolve(__dirname, 'config.json')
    }
  }
}
