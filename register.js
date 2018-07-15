import smartReady from '@functions/smartReady'
import removeCurrentScript from '@functions/removeCurrentScript'

const workerPath = '/swhw.js'

removeCurrentScript()

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
  [...document.getElementsByTagName('script')].filter(script => (script.src || "").endsWith('/rswh.js')).forEach(element => element.parentNode.removeChild(element))
}

smartReady(register)
