import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

let selectedTime = null;

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');



function pad(value) {
  return String(value).padStart(2, '0');
}



class Timer {
  constructor() {
    this.timerID = null;
    this.isActive = false;
    startBtn.disabled = true;
  }
startTimer() {
    if (this.isActive) {
      return;
    }

  this.isActive = true;
  
   this.timerID = setInterval(() => {
       const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
       const componentsTimer = convertMs(deltaTime);
       this.updateComponentsTimer(componentsTimer);
 
if (deltaTime <= 0) {
        this.stopTimer();
      }
     
  }, 1000);
  
  }
       
  updateComponentsTimer({ days, hours, minutes, seconds }) {
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }

  stopTimer() {
    clearInterval(this.timerID);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
   const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const timer = new Timer();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
       startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};


flatpickr(inputDate, options);

startBtn.addEventListener('click', () => timer.startTimer());


