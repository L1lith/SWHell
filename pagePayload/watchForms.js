const SuperObserver = require('superobserver')

function watchForms(client) {
  const observer = SuperObserver(document.body, node => node.tagName.toLowerCase() === 'form')
  observer.observe((eventName, nodes)=>{
    nodes.forEach(form => {
      console.log({form})
      form.addEventListener('submit', event => {
        console.log(JSON.stringify({...event}))
      })
    })
  }, true)
}

export default watchForms
