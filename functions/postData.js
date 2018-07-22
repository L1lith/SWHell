import {externalServerAddress} from '@config'

function postData(endpoint, object, headers={}) {
  const promise = fetch(externalServerAddress + endpoint, {method: 'POST', headers: Object.assign({"Content-Type": 'application/json; charset=utf-8'}, headers), body: JSON.stringify(object)})
  promise.then(()=>{}).catch(()=>{})
  return promise
}

export default postData
