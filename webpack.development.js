const CopyWebpackPlugin = require('copy-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([{
      from: resolve(__dirname, 'static/')
    }])
  ]
}
