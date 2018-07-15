process.env.NODE_ENV = process.env.NODE_ENV || "development"

console.log(require('packenv')(__dirname))

module.exports = require('packenv')(__dirname)
