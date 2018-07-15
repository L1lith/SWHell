import postData from '@functions/postData'

function onFormData(event) {
  postData('/formdata', event.body, {formurl: event.formURL})
}

export default onFormData
