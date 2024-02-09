import iziToast from 'izitoast';

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
                    message: `✅ Fulfilled promise ${position} in ${delay}ms`,
                    position: 'topRight',
                    balloon: true,
                    close: false,
                    backgroundColor: 'green',
                    maxWidth: 300,
                    timeout: false,
                    targetFirst: false,
                });
            })
            .catch(({ position, delay }) => {
                iziToast.show({
                    title: `❌ Rejected promise ${position} in ${delay}ms`,
                    position: 'topRight',
                    balloon: true,
                    close: false,
                    backgroundColor: 'red',
                    maxWidth: 300,
                    timeout: false,
                    targetFirst: false,
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


