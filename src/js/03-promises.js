import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("form.form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    doWork(+data.get('delay'), +data.get('step'), +data.get('amount'));
});

function doWork(delay, step, count) {
    for (let i = 0; i < count; i++) {
        createPromise(i + 1, delay + step * i)
            .then(({ position, delay }) => {
                iziToast.show({
                    title: `✅ Fulfilled promise ${position} in ${delay}ms`,
                    position: 'topRight',
                    backgroundColor: '#ddeedc',
                });
            })
            .catch(({ position, delay }) => {
                iziToast.show({
                    title: `❌ Rejected promise ${position} in ${delay}ms`,
                    position: 'topRight',
                    backgroundColor: '#f1807e',
                });
            });
    }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                return resolve({ position, delay });
            }
            return reject({ position, delay });
        }, delay);
    });
}


