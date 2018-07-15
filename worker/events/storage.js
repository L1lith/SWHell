import postData from '@functions/postData'

function onStorage(event) {
  postData('/storage', event.body)
}

export default onStorage
