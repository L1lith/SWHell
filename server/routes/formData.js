const {valid} = require('sandhands')

const bodyFormat = {_:{}, strict: false, validate: data => Object.values(data).every(value => typeof value == 'string' && value.length > 0)}

function formData(request, reply) {
  if (!valid(request.body, bodyFormat)) return reply.send()

  const formData = request.body

  console.log(formData)

  reply.send()
}

module.exports = formData
