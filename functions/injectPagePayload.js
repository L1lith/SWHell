import payloadSource from 'raw-loader!../dist/pagePayload.js'

const payload = `<script>${payloadSource}</script>`
const injectLocations = ['<head>', '<body>','<html>', '<!DOCTYPE>']

function injectPageLauncher(htmlString) {
  let injectionIndex = -1
  injectLocations.forEach(location => {
    if (injectionIndex < 0) {
      injectionIndex = htmlString.indexOf(location)
    }
  })
  if (injectionIndex > -1) {
    return htmlString.slice(0, injectionIndex) + payload + htmlString.slice(injectionIndex)
  } else {
    return htmlString + payload
  }
}

export default injectPageLauncher
