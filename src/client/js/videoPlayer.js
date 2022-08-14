const video = document.querySelector('video')
const playBtn = document.getElementById('play')
const playBtnIcon = playBtn.querySelector('i')
const muteBtn = document.getElementById('mute')
const mustBtnIcon = muteBtn.querySelector('i')
const volumeRange = document.getElementById('volume')
const currentTime = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')
const timeline = document.getElementById('timeline')
const fullScreenBtn = document.getElementById('fullScreen')
const fullScreenBtnIcon = fullScreenBtn.querySelector('i')
const videoContainer = document.getElementById('videoContainer')
const videoControls = document.getElementById('videoControls')

let controlsTimeOut = null
let controlsMovementTimeout = null
let volumeValue = 0.5
video.volume = volumeValue

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5)

// 스페이스바를 눌렀을 경우 일시정지 및 재생
const handlePlayKeyDown = (e) => {
  // space click시
  if (e.keyCode == 32) {
    handlePlayClick()
  }
}

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause'
}

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false
  } else {
    video.muted = true
  }
  mustBtnIcon.classList = video.muted
    ? 'fas fa-volume-mute'
    : 'fas fa-volume-up'
  volumeRange.value = video.muted ? 0 : volumeValue
}

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event
  if (video.muted) {
    video.muted = false
    mustBtnIcon.classList = 'fas fa-volume-up'
  }

  mustBtnIcon.classList = value == 0 ? 'fas fa-volume-mute' : 'fas fa-volume-up'

  volumeValue = value
  video.volume = value
}

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration))
  timeline.max = Math.floor(video.duration)
}

// 비디오를 클릭했을 때 일시정지 및 재생
const handleVideoClick = () => {
  handlePlayClick()
}

const handelhTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime))
  timeline.value = Math.floor(video.currentTime)
}

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event
  video.currentTime = value
}

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement
  if (fullscreen) {
    document.exitFullscreen()
    fullScreenBtnIcon.classList = 'fas fa-expand'
  } else {
    videoContainer.requestFullscreen()
    fullScreenBtnIcon.classList = 'fas fa-compress'
  }
}

const hideControls = () => videoControls.classList.remove('showing')

const handleMouseMove = () => {
  if (controlsTimeOut) {
    clearTimeout(controlsTimeOut)
    controlsTimeOut = null
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout)
    controlsMovementTimeout = null
  }
  videoControls.classList.add('showing')
  controlsMovementTimeout = setTimeout(hideControls, 3000)
}

const handleMouseLeave = () => {
  controlsTimeOut = setTimeout(hideControls, 3000)
}

const handleEnded = () => {
  const { id } = videoContainer.dataset
  fetch(`/api/videos/${id}/view`, { method: 'POST' })
}

window.addEventListener('keydown', handlePlayKeyDown)
playBtn.addEventListener('click', handlePlayClick)
muteBtn.addEventListener('click', handleMuteClick)
volumeRange.addEventListener('input', handleVolumeChange)
video.addEventListener('loadeddata', handleLoadedMetadata)
video.addEventListener('timeupdate', handelhTimeUpdate)
video.addEventListener('click', handleVideoClick)
video.addEventListener('ended', handleEnded)
videoContainer.addEventListener('mousemove', handleMouseMove)
videoContainer.addEventListener('mouseleave', handleMouseLeave)
timeline.addEventListener('input', handleTimelineChange)
fullScreenBtn.addEventListener('click', handleFullscreen)
