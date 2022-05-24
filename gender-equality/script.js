document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const errorMessage = document.querySelector('.form__error-message');
  const genderValues = form.querySelectorAll('.gender');

  form.addEventListener('submit', (event) => {

    genderValues.forEach((radioValue) => {
      if (radioValue.checked && radioValue.value === 'men') {
        event.preventDefault();
        errorMessage.textContent = `Мужчинам вход запрещен`;
        errorMessage.classList.remove('form__error-message__hidden');
      }

      if (radioValue.checked && radioValue.value === 'women') {
        event.preventDefault();
        errorMessage.textContent = `Женщинам вход запрещен`;
        errorMessage.classList.remove('form__error-message__hidden');
      }
    });
  });
});
