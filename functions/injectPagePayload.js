import payloadSource from 'raw-loader!../dist/pagePayload.js'

const payload = `<script>${payloadSource}</script>`

function injectPageLauncher(htmlString) {
  return htmlString + payload
}

export default injectPageLauncher
