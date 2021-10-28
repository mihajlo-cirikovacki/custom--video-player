'use strict';

const video = document.querySelector('.video');
const play = document.querySelector('.controls__play');
const stop = document.querySelector('.controls__stop');
const progress = document.querySelector('.progress-bar');
const timestamp = document.querySelector('.time__timestamp');
const timestampFullTime = document.querySelector('.time__timestamp--full');
const volume = document.querySelector('.controls__volume');
const volumeProgress = document.querySelector('.controls__volume-input');
const fullScreen = document.querySelector('.controls__full-screen');

// ================= FUNCTIONS:

// Play & pause video:
const toggleVideoStatus = function() {
  if(video.paused) video.play(); 
  else video.pause();
}

// Update play/pause icon:
const updatePlayIcon = function() {
  const playBtn = `<ion-icon name="play"></ion-icon>`;
  const pauseBtn = `<ion-icon name="pause"></ion-icon>`;
  if(video.paused) play.innerHTML = playBtn;
  else play.innerHTML = pauseBtn;
}

// Update progress & timestamp:
const updateProgress = function() {
  // console.log(video.currentTime); Sekunde koje su prosle
  // console.log(video.duration); Ukupno trajanje
  progress.value = (video.currentTime / video.duration ) * 100;

  // Get min:
  let mins = Math.trunc(video.currentTime / 60);
  if (mins < 10) mins = '0' + mins;

  // Get sek:
  let sec = Math.trunc(video.currentTime % 60);
  if (sec < 10) sec = '0' + sec;

  // Update timeStemp:
  timestamp.textContent = `${mins}:${sec}`;

  let min = Math.trunc(video.duration / 60);
  if (min < 10) min = '0' + min;

  let secFull = Math.trunc(video.duration % 60);
  if (secFull < 10) secFull = '0' + secFull;

  // Set full time:
  timestampFullTime.textContent = `${min}:${secFull}`;
}

// Set video time to progress:
const setVideoProgress = function() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video:
const stopVideo = function() {
  video.currentTime = 0;
  video.pause();
}

// Mute video:
const muteVideo = function() {
  // Check:
  video.muted = !video.muted;
  // Check and set icon:
  if(video.muted) volume.innerHTML = '<ion-icon name="volume-mute"></ion-icon>';
  else volume.innerHTML = '<ion-icon name="volume-high"></ion-icon>';
}


// ================= EVENT LISTENERS:
// VIDEO:
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
// BUTTONS:
play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('click', setVideoProgress);
volume.addEventListener('click', muteVideo);

fullScreen.addEventListener('click', (e) => {
  video.requestFullscreen();
})
