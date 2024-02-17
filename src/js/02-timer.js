import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector("button[data-start]");
const daysRef = document.querySelector("span[data-days]");
const hoursRef = document.querySelector("span[data-hours]");
const minutesRef = document.querySelector("span[data-minutes]");
const secondsRef = document.querySelector("span[data-seconds]");
const timerRef = document.getElementById("datetime-picker");

let selectedDate;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];

        if (selectedDate < new Date()) {
            iziToast.warning({
                title: "Caution",
                message: "Please choose a date in the future",
            });
            startBtn.disabled = true;
            return;
        }
        startBtn.disabled = false;
    },
};

flatpickr("input#datetime-picker", options);

startBtn.disabled = true;
startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    timerRef.disabled = true;
    const timer = setInterval(() => {
        const remaining = displayTimeRemaining(selectedDate);
        if (remaining < 1000) { // less then a second
            clearInterval(timer);
        }
    }, 1000);
});

function displayTimeRemaining(targetDate) {
    const remaining = targetDate.getTime() - Date.now();
    const timeParts = convertMs(remaining);

    daysRef.textContent = addLeadingZero(timeParts.days);
    hoursRef.textContent = addLeadingZero(timeParts.hours);
    minutesRef.textContent = addLeadingZero(timeParts.minutes);
    secondsRef.textContent = addLeadingZero(timeParts.seconds);

    return remaining;
}

function addLeadingZero(value) {
    return (value + "").padStart(2, "0");
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}