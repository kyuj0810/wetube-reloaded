import { async } from 'regenerator-runtime'

const videoContainer = document.getElementById('videoContainer')
const form = document.getElementById('commentForm')

const addComment = (text) => {
  const videoComments = document.querySelector('.video__comments ul')
  const newComment = document.createElement('li')
  newComment.className = 'video__comment'
  const icon = document.createElement('i')
  icon.className = 'fas fa-comment'
  //console.log('icon:', icon)
  const span = document.createElement('span')
  span.innerText = ` ${text}`
  //console.log('span:', span)
  newComment.appendChild(icon)
  newComment.appendChild(span)
  //console.log(newComment)
  videoComments.prepend(newComment)
}

const handleSubmit = async (event) => {
  event.preventDefault()
  const textarea = form.querySelector('textarea')
  const text = textarea.value
  const videoId = videoContainer.dataset.id
  if (text === '') {
    return
  }
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // json middleware로 처리해야한다고 express에게 알려줘야함.
    },
    body: JSON.stringify({ text }),
  })
  if (status === 201) {
    addComment(text)
  }
  textarea.value = ''
}

if (form) {
  form.addEventListener('submit', handleSubmit)
}
