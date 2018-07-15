const storage = require('./routes/storage')
const formData = require('./routes/formData')

function router(server) {
  server.post('/storage', storage)
  server.post('/formdata', formData)
}

module.exports = router
