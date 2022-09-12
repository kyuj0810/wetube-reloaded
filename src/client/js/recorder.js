import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
/* 
ffmpeg는 영상을 변환해서 오디오파일로 만들거나, 포맷을 변환헤주는 도구
무겁고, 보통은 백엔드에서 사용하지만, webassembly덕분에 프론트엔드에서도 사용할 수 있게 됐음.
*/
const actionBtn = document.getElementById('actionBtn')
const video = document.getElementById('preview')

let stream
let recorder
let videoFile

const files = {
  input: 'recording.webm',
  output: 'output.mp4',
  thumb: 'thumbnail.jpg',
}

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement('a')
  a.href = fileUrl
  a.download = fileName
  document.body.appendChild(a)
  a.click()
}

const handleDownload = async () => {
  actionBtn.removeEventListener('click', handleDownload)
  actionBtn.innerText = 'Transcoding...'
  actionBtn.disabled = true

  const ffmpeg = createFFmpeg({ log: true })
  await ffmpeg.load()

  ffmpeg.FS('writeFile', files.input, await fetchFile(videoFile)) // writeFile : ffmpeg의 가상의 세계에 파일을 생성해줌

  await ffmpeg.run('-i', files.input, '-r', '60', files.output)

  await ffmpeg.run(
    '-i',
    files.input,
    '-ss',
    '00:00:01',
    '-frames:v',
    '1',
    files.thumb,
  )

  const mp4File = ffmpeg.FS('readFile', files.output)
  const thumbFile = ffmpeg.FS('readFile', files.thumb)

  // binary data로 video, image 생성
  const mp4Blob = new Blob([mp4File.buffer], { type: 'video/mp4' })
  const thumbBlob = new Blob([thumbFile.buffer], { type: 'image/jpg' })

  const mp4Url = URL.createObjectURL(mp4Blob)
  const thumbUrl = URL.createObjectURL(thumbBlob)

  downloadFile(mp4Url, 'MyRecording.mp4')
  downloadFile(thumbUrl, 'MyThumbnail.jpg')

  ffmpeg.FS('unlink', files.input)
  ffmpeg.FS('unlink', files.output)
  ffmpeg.FS('unlink', files.thumb)

  //이 파일들을 메모리에서 삭제하기 위해 처리
  URL.revokeObjectURL(mp4Url)
  URL.revokeObjectURL(thumbUrl)
  URL.revokeObjectURL(videoFile)

  actionBtn.disabled = false
  actionBtn.innerText = 'Record Again'
  actionBtn.addEventListener('click', handleStart)
}

const handleStart = () => {
  actionBtn.innerText = 'Recording'
  actionBtn.disabled = true
  actionBtn.removeEventListener('click', handleStart)
  recorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data) // 파일은 브라우저의 메모리 상에 있음.
    video.srcObject = null
    video.src = videoFile
    video.loop = true
    video.play()
    actionBtn.innerText = 'Download'
    actionBtn.disabled = false
    actionBtn.addEventListener('click', handleDownload)
  }
  recorder.start()
  setTimeout(() => {
    recorder.stop()
  }, 5000)
}

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1024,
      height: 576,
    },
  })
  video.srcObject = stream
  video.play()
}

init()

actionBtn.addEventListener('click', handleStart)
