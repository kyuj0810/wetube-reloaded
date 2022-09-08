import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const startBtn = document.getElementById('startBtn')
const video = document.getElementById('preview')

let stream
let recorder
let videoFile

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true })
  await ffmpeg.load()

  ffmpeg.FS('writeFile', 'recording.webm', await fetchFile(videoFile)) // writeFile : ffmpeg의 가상의 세계에 파일을 생성해줌

  await ffmpeg.run('-i', 'recording.webm', '-r', '60', 'output.mp4')

  const mp4File = ffmpeg.FS('readFile', 'output.mp4')

  const mp4Blob = new Blob([mp4File.buffer], { type: 'video/mp4' })

  const mp4Url = URL.createObjectURL(mp4Blob)

  const a = document.createElement('a')
  a.href = mp4Url
  a.download = 'MyRecording.mp4'
  document.body.appendChild(a)
  a.click()
}

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
  recorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data) // 파일은 브라우저의 메모리 상에 있음.
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
