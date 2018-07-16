const url = require('url')

function getDomain(urlIn) {
  if (typeof urlIn != 'string') return null
  try {
    return url.parse(urlIn).hostname
  } catch(err) {
    return null
  }
}

module.exports = getDomain
