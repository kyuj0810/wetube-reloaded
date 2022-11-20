import { async } from 'regenerator-runtime'

const videoContainer = document.getElementById('videoContainer')
const form = document.getElementById('commentForm')
const deleteBtn = document.getElementsByClassName('deleteBtn')

const addComment = (text, id) => {
  const videoComments = document.querySelector('.video__comments ul')
  const newComment = document.createElement('li')
  newComment.className = 'video__comment'
  newComment.dataset.id = id
  const icon = document.createElement('i')
  icon.className = 'fas fa-comment'
  const span = document.createElement('span')
  span.innerText = ` ${text}`
  const span2 = document.createElement('span')
  span2.innerText = '❌'
  newComment.appendChild(icon)
  newComment.appendChild(span)
  newComment.appendChild(span2)
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
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // json middleware로 처리해야한다고 express에게 알려줘야함.
    },
    body: JSON.stringify({ text }),
  })
  if (response.status === 201) {
    textarea.value = ''
    const { newCommentId } = await response.json()
    addComment(text, newCommentId)
  }
}

const handleDelete = async (event) => {
  event.preventDefault()
  const videoId = videoContainer.dataset.id
  const commentId = event.path[1].dataset.id
  console.log(commentId)

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json', // json middleware로 처리해야한다고 express에게 알려줘야함.
    },
    body: JSON.stringify({ commentId }),
  })
  if (response.status === 201) {
    location.reload()
  }
}

if (form) {
  form.addEventListener('submit', handleSubmit)

  //deleteComment
  Array.from(deleteBtn).forEach(function (element) {
    element.addEventListener('click', handleDelete)
  })
}
/*
backend에서 해야 할 일은 url , controller (내가 댓글의 작ㅈ성자인지 확인하도록 그 다음 댓글 지우기)

첫째로 html에서 사용자는 댓글의 작성자가 아니라면 삭제버튼을 보지 못해야함.
두번째 확인은 controller에서 
*/
