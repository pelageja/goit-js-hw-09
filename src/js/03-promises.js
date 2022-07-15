
import Notiflix from 'notiflix';
 
 const formEl = document.querySelector('.form');
 formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  let delay = Number(event.currentTarget.delay.value);
  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
      .catch(({ position, delay }) => {
       Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    delay += step;
  }
  
}

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
