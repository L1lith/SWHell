const webpack = require('webpack')
const args = require('yargs').argv
const {unlink} = require('fs')
const {join} = require('path')

if ((args.production || args.prod || args.p) === true) {
  process.env.NODE_ENV = 'production'
} else if ((args.development || args.dev || args.d) === true) {
  process.env.NODE_ENV = 'development'
}

const config = require('./webpack.config.js')

const entrySets = [{
  pagePayload: './pagePayload/index.js'
}, {
  swhw: "./worker/index.js",
  rswh: "./register.js"
}]

console.log(`Running in ${process.env.NODE_ENV}`)

async function run() {
  console.log('Starting Webpacks')
  for (let i = 0; i < entrySets.length; i++) {
    const entrySet = entrySets[i]
    const entrySetName = "EntrySet #" + (i + 1)
    await watch(entrySet, process.env.NODE_ENV !== 'production' ? 'watch' : 'run', err => {
      if (err) return console.log('Error Building ' + entrySetName)
      console.log(entrySetName + " Built")
    })
  }
  if (process.env.NODE_ENV !== 'production') {
    console.log('Finished Starting')
  } else {
    unlink(join(__dirname, '/dist/pagePayload.js'), err => {
      if (err) return console.log(err)
      console.log('Finished Building')
    })
  }
}

function watch(entry, mode="watch", callback, ...args) {
  let built = false
  const compiler = webpack({...config, entry})
  return new Promise((resolve, reject) => {
    if (!["watch", "run"].includes(mode)) return reject(`Invalid Mode "${mode}"`)
    compiler[mode](...(args.filter(value => typeof value == 'object' && value !== null).slice(0, 1)), (err, stats) => {
      if (built === false) {
        built = true
        if (err) return reject(err)
        resolve()
      }
      if (typeof callback == 'function') callback(err, stats)
    })
  })
}

run()
