const startBtn = document.getElementById('startBtn')
const video = document.getElementById('preview')

let stream
let recorder

const handleDownload = () => {}

const handleStop = () => {
  startBtn.innerText = 'Download Recording'
  startBtn.removeEventListener('click', handleStop)
  startBtn.addEventListener('click', handleDownload)

  recorder.stop()
}

const handleStart = () => {
  startBtn.innerText = 'Stop Recording'
  startBtn.removeEventListener('click', handleStart)
  startBtn.addEventListener('click', handleStop)
  recorder = new MediaRecorder(stream)
  recorder.ondataavailable = (event) => {
    const videoFile = URL.createObjectURL(event.data) // 파일은 브라우저의 메모리 상에 있음.
    video.srcObject = null
    video.src = videoFile
    video.loop = true
    video.play()
  }
  recorder.start()
}

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  })
  video.srcObject = stream
  video.play()
}

init()

startBtn.addEventListener('click', handleStart)
