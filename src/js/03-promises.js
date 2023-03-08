import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSuccess(position, delay) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function handleFailure(position, delay) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);

  if (!delay || !step || !amount || delay <= 0 || step <= 0 || amount <= 0) {
    return;
  }

  for (let i = 0; i < amount; i += 1) {
    const position = i;
    const promiseDelay = delay + i * step;

    createPromise(position, promiseDelay)
      .then(result => handleSuccess(result.position, result.delay))
      .catch(result => handleFailure(result.position, result.delay));
  }
});
