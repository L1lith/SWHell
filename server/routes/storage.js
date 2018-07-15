const {valid} = require('sandhands')

const bodyFormat = {
  localStorage: {_:{}, strict: false},
  cookies: {_: String, minLength: 0},
  sessionStorage: {_:{}, strict: false}
}

function storage(request, reply) {
  if (!valid(request.body, bodyFormat)) return reply.send()
  console.log('Got Storage Contents', request.body)
  reply.send()
}

module.exports = storage
