const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervalId = null;

function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function startColorSwitcher() {
  startBtn.disabled = true;
  intervalId = setInterval(changeColor, 1000);
}

function stopColorSwitcher() {
  startBtn.disabled = false;
  clearInterval(intervalId);
}

startBtn.addEventListener('click', startColorSwitcher);
stopBtn.addEventListener('click', stopColorSwitcher);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
