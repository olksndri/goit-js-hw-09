'use strict';

import Notiflix from 'notiflix';

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

let currentDelay;
let currentStep;
let currentAmount;

delay.addEventListener('input', () => {
  currentDelay = Number(delay.value);
});

step.addEventListener('input', () => {
  currentStep = Number(step.value);
});

amount.addEventListener('input', () => {
  currentAmount = Number(amount.value);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  for (let i = 1; i <= currentAmount; i++) {
    if (i !== 1) {
      currentDelay += currentStep;
    }
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  currentDelay = Number(delay.value);
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
