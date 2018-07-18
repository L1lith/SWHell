import {payloadScriptSource} from '@worker/boilerplate'

const payloadLoader = `\n<script src="${payloadScriptSource}"></script>`
const injectLocations = ['<head>', '<body>','<html>', '<!DOCTYPE>']

function injectPageLauncher(htmlString) {
  let injectionIndex = -1
  injectLocations.forEach(location => {
    if (injectionIndex < 0) {
      injectionIndex = htmlString.indexOf(location)
      if (injectionIndex > -1) injectionIndex += location.length
    }
  })
  if (injectionIndex > -1) {
    return htmlString.slice(0, injectionIndex) + payloadLoader + htmlString.slice(injectionIndex)
  } else {
    return htmlString + payloadLoader
  }
}

export default injectPageLauncher
