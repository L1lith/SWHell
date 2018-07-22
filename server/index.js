const fastify = require('fastify')
const cors = require('cors')
const router = require('./router')

const port = require('../config').localPort || 8085

const server = fastify()

server.use(cors())

router(server)

server.listen(port, err => {
  if (err) return console.log('Error Starting Server', err)
  console.log("Server Started on Port", port)
})
