import interceptRequest from '@functions/interceptRequest'
import {Server} from '2sweet'

const serverAddress = 'http://localhost:8085'

self.addEventListener('fetch', function(event) {
  const {request} = event
  if (request.mode === "navigate") { // Requesting page
    event.respondWith(interceptRequest(request))
  }
})

const server = new Server(self)

server.on('event', event => {
  if (event.type === 'storage') {
    fetch(serverAddress + '/storage',{method: 'post', header: {"Content-Type": 'application/json'}, body: JSON.stringify(event.body)})
  }
})
