
let enabledState = false;

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");

let colorTimer;

startBtn.addEventListener('click', () => {
    enabledState = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;

    colorTimer = setInterval(() => {
        const color = getRandomHexColor();

        document.body.style.backgroundColor = color;
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    enabledState = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;

    clearInterval(colorTimer);
});


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}