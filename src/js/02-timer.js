import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let chosenTime = 0;
let isAvaibleDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    chosenTime = selectedDates[0].getTime();
    isAvaibleDate = chosenTime - Date.now();
    if (isAvaibleDate <= 0) {
      Notiflix.Report.failure(
        'You cannot select a past date',
        'Please choose a date in the future',
        'Ok'
      );
      return;
    }
    refs.startBtnEl.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

const refs = {
  startBtnEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

refs.startBtnEl.setAttribute('disabled', true);

refs.startBtnEl.addEventListener('click', onStartBtnClick);

const timer = {
  intervalID: null,
  isActive: false,

  onClose() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    const currentDate = Date.now();

    let counting = chosenTime - currentDate;

    this.intervalID = setInterval(() => {
      counting = counting -= 1000;
      const timerComponents = convertMs(counting);
      updateClockFace(timerComponents);
      if (counting <= 1000) {
        stopInterval(this.intervalID);
      }
    }, 1000);
  },
};

function stopInterval(interval) {
  clearInterval(interval);
  console.log(`Interval with id ${interval} has stopped!`);
}

function onStartBtnClick() {
  timer.onClose();
  refs.startBtnEl.setAttribute('disabled', true);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
}
