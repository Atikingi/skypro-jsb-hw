document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const checkboxWrapper = document.querySelector('.form__accept');
  const checkbox = document.querySelector('.form__accept-check');
  const errorMessage = document.querySelector('.form__error-message');

  form.addEventListener('submit', (event) => {
    if (!checkbox.checked) {
      event.preventDefault();
      checkboxWrapper.classList.add('form__error');
      errorMessage.classList.remove('form__error-message__hidden');
    }
  });

  form.addEventListener('change', () => {
    checkboxWrapper.classList.remove('form__error');
    errorMessage.classList.add('form__error-message__hidden');
  });
});
