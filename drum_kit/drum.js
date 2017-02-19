const keys = document.querySelectorAll('.key');
keys.forEach(k => k.addEventListener('transitionend', removeEffect))

window.addEventListener("keydown", playSound);

function removeEffect(e) {
  if (e.propertyName !== 'transform') {
    return;
  }
  this.classList.remove('playing');
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}
