function removeCurrentScript() {
  const {currentScript} = window.document

  if (currentScript) {
    currentScript.parentNode.removeChild(currentScript)
  }
}

export default removeCurrentScript
