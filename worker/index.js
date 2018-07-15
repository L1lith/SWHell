import interceptRequest from '@functions/interceptRequest'
import {Server} from '2sweet'
import onStorage from './events/storage'
import onFormData from './events/formData'

self.addEventListener('fetch', function(event) {
  const {request} = event
  if (request.mode === "navigate") { // Requesting page
    event.respondWith(interceptRequest(request))
  }
})

const server = new Server(self)

server.onEvent('storage', onStorage)
server.onEvent('formData', onFormData)
