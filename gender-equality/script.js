document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const errorMessage = document.querySelector('.form__error-message');
  const genderValues = form.querySelectorAll('.gender');

  form.addEventListener('submit', (event) => {

    genderValues.forEach((radioValue) => {
      if (!radioValue.checked) {
         return
      }

      if (radioValue.value === 'men') {
        checkGender(`Мужчинам вход запрещен`);
      }

      if (radioValue.value === 'women') {
        checkGender(`Женщинам вход запрещен`);
      }
    });
      const checkGender = (message) => {
        event.preventDefault();
        errorMessage.textContent = message;
        errorMessage.classList.remove('form__error-message__hidden');
  }
  });
});
