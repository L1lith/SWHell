const {valid} = require('sandhands')

const bodyFormat = {_:{}, strict: false}

function formData(request, reply) {

  if (!valid(request.body, bodyFormat)) return reply.send()

  const {body} = request
  const {origin, formurl} = request.headers

  if (typeof origin != 'string' || origin.length < 1) return reply.send()
  if (typeof formurl != 'string' || formurl.length < 1) return reply.send()

  Object.entries(body).forEach(([key, value]) => {
    if (typeof value != 'string' || value.length < 1) delete body[key]
  })
  if (Object.keys(body).length < 1) return reply.send()

  console.log('Got Form Data', {origin, body, formurl})

  reply.send()
}


module.exports = formData
