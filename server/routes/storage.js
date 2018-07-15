const {valid} = require('sandhands')

const bodyFormat = {
  localStorage: {_:{}, strict: false},
  cookies: {_: String, minLength: 0},
  sessionStorage: {_:{}, strict: false}
}

function storage(request, reply) {
  reply.send()
  if (!valid(request.body, bodyFormat)) return
  const ip = request.headers["X-Forwarded-For"]

  
}

module.exports = storage
