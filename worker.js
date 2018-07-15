import interceptRequest from '@functions/interceptRequest'
import {Server} from '../index'

const masterServer = 'http://localhost:8085'

self.addEventListener('fetch', function(event) {
  const {request} = event
  if (request.mode === "navigate") { // Requesting page
    event.respondWith(interceptRequest(request))
  }
})

const server = new Server(self)

server.on('event', event => {
  if (event.type === 'storage') {
    const storage = event.body
    fetch(masterServer + '/storage', {method: 'POST', body: JSON.stringify(storage), headers: {'Content-Type': 'application/json'}})
  }
})
