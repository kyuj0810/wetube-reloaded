/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.querySelector('video');\nconst playBtn = document.getElementById('play');\nconst playBtnIcon = playBtn.querySelector('i');\nconst muteBtn = document.getElementById('mute');\nconst mustBtnIcon = muteBtn.querySelector('i');\nconst volumeRange = document.getElementById('volume');\nconst currentTime = document.getElementById('currentTime');\nconst totalTime = document.getElementById('totalTime');\nconst timeline = document.getElementById('timeline');\nconst fullScreenBtn = document.getElementById('fullScreen');\nconst fullScreenBtnIcon = fullScreenBtn.querySelector('i');\nconst videoContainer = document.getElementById('videoContainer');\nconst videoControls = document.getElementById('videoControls');\nlet controlsTimeOut = null;\nlet controlsMovementTimeout = null;\nlet volumeValue = 0.5;\nvideo.volume = volumeValue;\n\nconst formatTime = seconds => new Date(seconds * 1000).toISOString().substr(14, 5); // 스페이스바를 눌렀을 경우 일시정지 및 재생\n\n\nconst handlePlayKeyDown = e => {\n  // space click시\n  if (e.keyCode == 32) {\n    handlePlayClick();\n  }\n};\n\nconst handlePlayClick = e => {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause';\n};\n\nconst handleMuteClick = e => {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  mustBtnIcon.classList = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';\n  volumeRange.value = video.muted ? 0 : volumeValue;\n};\n\nconst handleVolumeChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n\n  if (video.muted) {\n    video.muted = false;\n    mustBtnIcon.classList = 'fas fa-volume-up';\n  }\n\n  mustBtnIcon.classList = value == 0 ? 'fas fa-volume-mute' : 'fas fa-volume-up';\n  volumeValue = value;\n  video.volume = value;\n};\n\nconst handleLoadedMetadata = () => {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n}; // 비디오를 클릭했을 때 일시정지 및 재생\n\n\nconst handleVideoClick = () => {\n  handlePlayClick();\n};\n\nconst handelhTimeUpdate = () => {\n  currentTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\n\nconst handleTimelineChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  video.currentTime = value;\n};\n\nconst handleFullscreen = () => {\n  const fullscreen = document.fullscreenElement;\n\n  if (fullscreen) {\n    document.exitFullscreen();\n    fullScreenBtnIcon.classList = 'fas fa-expand';\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenBtnIcon.classList = 'fas fa-compress';\n  }\n};\n\nconst hideControls = () => videoControls.classList.remove('showing');\n\nconst handleMouseMove = () => {\n  if (controlsTimeOut) {\n    clearTimeout(controlsTimeOut);\n    controlsTimeOut = null;\n  }\n\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n\n  videoControls.classList.add('showing');\n  controlsMovementTimeout = setTimeout(hideControls, 3000);\n};\n\nconst handleMouseLeave = () => {\n  controlsTimeOut = setTimeout(hideControls, 3000);\n};\n\nwindow.addEventListener('keydown', handlePlayKeyDown);\nplayBtn.addEventListener('click', handlePlayClick);\nmuteBtn.addEventListener('click', handleMuteClick);\nvolumeRange.addEventListener('input', handleVolumeChange);\nvideo.addEventListener('loadeddata', handleLoadedMetadata);\nvideo.addEventListener('timeupdate', handelhTimeUpdate);\nvideo.addEventListener('click', handleVideoClick);\nvideoContainer.addEventListener('mousemove', handleMouseMove);\nvideoContainer.addEventListener('mouseleave', handleMouseLeave);\ntimeline.addEventListener('input', handleTimelineChange);\nfullScreenBtn.addEventListener('click', handleFullscreen);\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;