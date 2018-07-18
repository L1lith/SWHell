import interceptRequest from '@functions/interceptRequest'
import {Server} from '2sweet'
import onStorage from './events/storage'
import onFormData from './events/formData'
import {payloadScriptSource} from '@worker/boilerplate'

self.addEventListener('fetch', function(event) {
  const {request} = event
  const {pathname} = new URL(request.url)
  if (request.mode === "navigate") { // Requesting page
    event.respondWith(interceptRequest(request, 'navigate'))
  } else if (pathname === payloadScriptSource) {
    event.respondWith(interceptRequest(request, 'pagePayload'))
  }
})

const server = new Server(self)

server.onEvent('storage', onStorage)
server.onEvent('formData', onFormData)
