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
  const domain = getDomain(request.headers.origin)
  const {formurl} = request.headers
  const ip = request.headers["X-Forwarded-For"] || "73.20.121.123"

  if (ip) {
    if (!isIp(ip)) return console.log(new Error('Malformed IP: "' + ip + '"!'))
  } else {
    if (allowMissingIPHeader !== true) return
    console.warn('Missing X-Forwarded-For Header')
  }

  if (typeof domain != 'string' || domain.length < 1) return
  if (typeof formurl != 'string' || formurl.length < 1) return

  Object.entries(body).forEach(([key, value]) => {
    if (typeof value != 'string' || value.length < 1) delete body[key]
  })
  if (Object.keys(body).length < 1) return

  if (ip) {
    saveKnownSource({body, ip, domain, formurl})
  } else {
    saveUnknownSource({body, domain, formurl})
  }
}

const dataFolder = resolve(__dirname, "../data")

function saveKnownSource({body, ip, domain, formurl}) {
  const storageFolder = join(dataFolder, ip.replace(/\./g, '-'), domain)
  const filePath = storageFolder + '/formdata.json'
  mkdirp(storageFolder, err => {
    if (err) return console.log(err)
    access(filePath, err => {
      if (err) {
        let output = {}
        output[formurl] = {}
        mergeData(output[formurl], body)
        output = JSON.stringify(output)
        writeFile(filePath, output, err => {
          if (err) return console.log(err)
        })
      } else {
        jsonfile.readFile(filePath, (err, output) => {
          if (err) return console.log(err)
          if (!output.hasOwnProperty(formurl)) output[formurl] = {}
          mergeData(output[formurl], body)
          output = JSON.stringify(output)
          writeFile(filePath, output, err => {
            if (err) return console.log(err)
          })
        })
      }
    })
  })
}

const unknownStorageFolder = join(dataFolder, '/unknown/formdata/')

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

function mergeData(master, newData) {
  Object.entries(newData).forEach(([key, value]) => {
    if (!master.hasOwnProperty(key)) master[key] = []
    const storageLocation = master[key]
    if (storageLocation[storageLocation.length - 1] !== value) storageLocation.push(value)
  })
}

module.exports = formData
