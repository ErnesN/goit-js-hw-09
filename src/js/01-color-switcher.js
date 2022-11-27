const TIME_DELAY = 1000;
const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

refs.startButton.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, TIME_DELAY);
});
refs.stopButton.setAttribute('disabled', true);

refs.startButton.addEventListener('click', () => {
  refs.startButton.setAttribute('disabled', true);
  refs.stopButton.removeAttribute('disabled');
});

refs.stopButton.addEventListener('click', () => {
  clearInterval(timerId);
});

refs.stopButton.addEventListener('click', () => {
  refs.startButton.removeAttribute('disabled');
  refs.stopButton.setAttribute('disabled', true);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
