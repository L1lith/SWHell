const storage = require('./routes/storage')

function router(server) {
  server.post('/storage', storage)
}

module.exports = router
