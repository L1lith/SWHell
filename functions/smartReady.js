function smartReady(callback) {
  if (document.readyState === "complete") {
    callback()
  } else {
    window.addEventListener('load', callback)
  }
}

export default smartReady
