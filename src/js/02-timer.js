'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

let userDate;
let currentTime;

setInterval(() => {
  const date = new Date();
  currentTime = date.getTime();
}, 1000);

startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', '');
    } else {
      Notiflix.Notify.success('Press start to begin the countdown');
      userDate = selectedDates[0].getTime();
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');

  document
    .querySelectorAll('input')
    .forEach(inp => inp.setAttribute('disabled', ''));

  const timer = setInterval(() => {
    let difference = userDate - currentTime;
    const dateObj = convertMs(difference);

    spanDays.textContent = addLeadingZero(dateObj.days);
    spanHours.textContent = addLeadingZero(dateObj.hours);
    spanMinutes.textContent = addLeadingZero(dateObj.minutes);
    spanSeconds.textContent = addLeadingZero(dateObj.seconds);

    if (
      spanDays.textContent === '00' &&
      spanHours.textContent === '00' &&
      spanMinutes.textContent === '00' &&
      spanSeconds.textContent === '00'
    ) {
      clearInterval(timer);
      Notiflix.Notify.info('Countdown is over');
    }
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
