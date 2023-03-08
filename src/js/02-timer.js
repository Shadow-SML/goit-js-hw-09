import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

setDisabledAttribute(elements.startBtn);
elements.startBtn.addEventListener('click', start);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose() {
    const timeDifference = calculateTimeDifference();
    if (timeDifference < 0) {
      Notify.failure('Please choose a date in the future');
      setDisabledAttribute(elements.startBtn);
      return;
    }
    Notify.success('Valid date chosen, press "Start"');
    removeDisabledAttribute(elements.startBtn);
  },
};

flatpickr(elements.inputDate, options);

function start() {
  setDisabledAttribute(elements.startBtn);
  setInterval(() => {
    const timeDifference = calculateTimeDifference();
    if (timeDifference >= 0) {
      updateClockFace(convertMs(timeDifference));
    }
  }, 1000);
}

function calculateTimeDifference() {
  const selectedTime = new Date(elements.inputDate.value).getTime();
  const currentTime = Date.now();
  return selectedTime - currentTime;
}

function convertMs(milliseconds) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(milliseconds / day));
  const hours = pad(Math.floor((milliseconds % day) / hour));
  const minutes = pad(Math.floor(((milliseconds % day) % hour) / minute));
  const seconds = pad(
    Math.floor((((milliseconds % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  elements.days.textContent = pad(days);
  elements.hours.textContent = pad(hours);
  elements.minutes.textContent = pad(minutes);
  elements.seconds.textContent = pad(seconds);
}

function setDisabledAttribute(element) {
  element.setAttribute('disabled', 'true');
}

function removeDisabledAttribute(element) {
  element.removeAttribute('disabled');
}
