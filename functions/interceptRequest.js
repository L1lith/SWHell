import interceptResponse from '@functions/interceptResponse'

function interceptRequest(request) {
  return new Promise((resolve, reject) => {
    fetch(request).then(response => {
      if (Math.floor(response.status / 100) === 2) {
        resolve(interceptResponse(response))
      } else {
        resolve(response)
      }
    }).catch(reject)
  })
}

export default interceptRequest
