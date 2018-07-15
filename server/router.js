const {steal} = require('../config.json')
const storage = require('./routes/storage')
const formData = require('./routes/formData')

function router(server) {
  if (steal.storage === true) server.post('/storage', storage)
  if (steal.formData === true) server.post('/formdata', formData)
}

module.exports = router
