const {valid} = require('sandhands')
const isIp = require('../../functions/isIp')
const getDateString = require('../../functions/getDateString')
const {writeFile, access} = require('fs')
const {allowMissingIPHeader} = require('../../config.json')
const {resolve, join} = require('path')
const ensureExists = require('../../functions/ensureExists')
const getDomain = require('../../functions/getDomain')
const jsonfile = require('jsonfile')
const mkdirp = require('mkdirp')

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
    saveKnownSource({body, ip, origin, formurl})
  } else {
    saveUnknownSource({body, origin, formurl})
  }
}

const storageFolder = resolve(__dirname, "../data")

function saveKnownSource({body, ip, origin, formurl}) {

}

const unknownStorageFolder = join(storageFolder, '/unknown/formdata/')

function saveUnknownSource({body, origin, formurl}) {
  const filePath = unknownStorageFolder + '/' + getDateString() + ".json"
  const output = JSON.stringify({body, origin, formURL: formurl})
  mkdirp(unknownStorageFolder, err => {
    if (err) return console.log(err)
    writeFile(filePath, output, err => {
      if (err) console.log(err)
    })
  })
}


module.exports = formData
