import interceptResponse from '@functions/interceptResponse'

function interceptRequest(request) {
  return new Promise((resolve, reject) => {
    fetch(request).then(response => {
      resolve(interceptResponse(response))
    }).catch(reject)
  })
}

export default interceptRequest
