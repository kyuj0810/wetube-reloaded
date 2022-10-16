import { async } from 'regenerator-runtime'

const videoContainer = document.getElementById('videoContainer')
const form = document.getElementById('commentForm')

const handleSubmit = async (event) => {
  event.preventDefault()
  const textarea = form.querySelector('textarea')
  const text = textarea.value
  const videoId = videoContainer.dataset.id
  if (text === '') {
    return
  }
  await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // json middleware로 처리해야한다고 express에게 알려줘야함.
    },
    body: JSON.stringify({ text }),
  })
  textarea.value = ''
}

if (form) {
  form.addEventListener('submit', handleSubmit)
}
