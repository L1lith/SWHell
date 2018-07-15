import injectPagePayload from '@functions/injectPagePayload'

function interceptResponse(response) {
  return new Promise((resolve, reject) => {
    response.text().then(bodyText => {
      const {headers, status, statusText} = response
      resolve(new Response(injectPagePayload(bodyText), {headers, status, statusText}))
    }).catch(reject)
  })
}

export default interceptResponse
