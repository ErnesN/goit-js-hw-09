import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  firstDelayInptEl: document.querySelector('input[name="delay"]'),
  delayStepInptEl: document.querySelector('input[name="step"]'),
  amountInptEl: document.querySelector('input[name="amount"]'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();

  let firstDelayValue = Number(refs.firstDelayInptEl.value);
  let delayStepValue = Number(refs.delayStepInptEl.value);
  let amountValue = Number(refs.amountInptEl.value);

  for (let i = 0; i < amountValue; i += 1) {
    createPromise(i + 1, i * delayStepValue + firstDelayValue)
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
  evt.target.reset();
}
