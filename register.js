import smartReady from '@functions/smartReady'
import removeCurrentScript from '@functions/removeCurrentScript'
import removeScriptsWithSource from '@functions/removeScriptsWithSource'

const workerPath = '/swhw.js'

removeCurrentScript()
removeScriptsWithSource('/rswh.js')

function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      const worker = registrations[0]
      if (worker) {
        // Do Nothing
      } else {
        navigator.serviceWorker.register(workerPath).then(registration => {
          // Registration was successful
          //console.log('ServiceWorker registration successful with scope: ', registration.scope);
          //navigator.serviceWorker.controller.postMessage(parseMessage({type: "register"}))
          window.location.reload()
        }, err => {
          // registration failed :(
          //console.log('ServiceWorker registration failed: ', err);
        })
      }
    })
  }
  // Cleanup Script Elements
}

smartReady(register)
