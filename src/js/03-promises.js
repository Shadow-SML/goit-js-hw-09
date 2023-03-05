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

  const promises = Array.from({ length: amount }, (_, i) =>
    createPromise(i + 1, delay + i * step)
  );

  Promise.allSettled(promises).then(results => {
    results.forEach(({ status, value }, i) => {
      const { position, delay } = value;
      if (status === 'fulfilled') {
        handleSuccess(position, delay);
      } else {
        handleFailure(position, delay);
      }
    });
  });
});
