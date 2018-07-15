const SuperObserver = require('superobserver')

function watchForms(client) {
  const observer = SuperObserver(document.body, node => node.tagName.toLowerCase() === 'form')
  observer.observe((eventName, nodes)=>{
    nodes.forEach(form => {
      form.addEventListener('submit', event => {
        const formData = new FormData(event.target)
        var body = {}
        formData.forEach((value, key) => {
          if (typeof value == 'string' && value.length > 0) body[key] = value
        })
        if (Object.keys(body).length > 0) client.send({type: 'formData', body, formURL: event.target.action || window.location.pathname})
      })
    })
  }, true)
}

export default watchForms
