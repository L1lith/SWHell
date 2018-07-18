function removeScriptsWithSource(source) {
  [...document.getElementsByTagName('script')].filter(script => new URL(script.src || "").pathname === source).forEach(element => element.parentNode.removeChild(element))
}

export default removeScriptsWithSource
