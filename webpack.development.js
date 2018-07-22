const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([{
      from: resolve(__dirname, 'static/')
    }])
  ]
}
