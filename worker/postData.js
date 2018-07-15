function postData(endpoint, object, headers={}) {
  return fetch(serverAddress + endpoint, {method: 'POST', headers: Object.assign({"Content-Type": 'application/json; charset=utf-8'}, headers), body: JSON.stringify(object)}).then(()=>{}).catch(()=>{})
}

export default postData
