const fastify = require('fastify')
const cors = require('cors')
const router = require('./router')

const port = 8085

const server = fastify()

server.use(cors())

router(server)

server.listen(port, err => {
  if (err) console.log('Error Starting Server', err)
  console.log("Server Started on Port", port)
})
