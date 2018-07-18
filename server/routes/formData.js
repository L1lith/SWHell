const {valid} = require('sandhands')
const isIp = require('../../functions/isIp')

const bodyFormat = {_:{}, strict: false}

function formData(request, reply) {
  reply.send()

  if (!valid(request.body, bodyFormat)) return

  const {body} = request
  const {origin, formurl} = request.headers
  const ip = request.headers["X-Forwarded-For"]

  if (ip) {
    if (!isIp(ip)) return console.log(new Error('Malformed IP: "' + ip + '"!'))
  } else {
    if (allowMissingIPHeader !== true) return
    console.warn('Missing X-Forwarded-For Header')
  }

  if (typeof origin != 'string' || origin.length < 1) return
  if (typeof formurl != 'string' || formurl.length < 1) return

  Object.entries(body).forEach(([key, value]) => {
    if (typeof value != 'string' || value.length < 1) delete body[key]
  })
  if (Object.keys(body).length < 1) return

  if (ip) {
    saveKnownSource({body, ip})
  } else {
    saveUnknownSource({body})
  }
}

function saveKnownSource() {

}
function saveUnknownSource() {
  
}


module.exports = formData
