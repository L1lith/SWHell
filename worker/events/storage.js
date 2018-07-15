import postData from '@functions/postData'

function onStorage(event) {
  console.log('storage')
  postData('/storage', event.body)
}

export default onStorage
