import interceptResponse from '@functions/interceptResponse'
import payloadSource from 'raw-loader!../dist/pagePayload.js'


function interceptRequest(request, type) {
  return new Promise((resolve, reject) => {
    if (type === 'navigate') {
      fetch(request).then(response => {
        if (Math.floor(response.status / 100) === 2) {
          resolve(interceptResponse(response))
        } else {
          resolve(response)
        }
      }).catch(reject)
    } else if (type === "pagePayload") {
      resolve(new Response(payloadSource))
    }
  })
}

export default interceptRequest
