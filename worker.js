import interceptRequest from '@functions/interceptRequest'
import {Server} from '2sweet'

self.addEventListener('fetch', function(event) {
  const {request} = event
  if (request.mode === "navigate") { // Requesting page
    event.respondWith(interceptRequest(request))
  }
})

self.addEventListener('message', event => {
  let message
  try {
    message = JSON.parse(event.data)
  } catch(error) {
    return
  }
  const keys = Object.keys(message)
  if (keys.length === 1 && keys[0] === 'eval') {

  }
})
