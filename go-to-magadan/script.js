document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const city = document.querySelector(".form__city");

  form.addEventListener("submit", (event) => {
    if (city.value === 'false'){
      event.preventDefault();
      city.classList.add('form__error');
    }
  });

  form.addEventListener('change', () => {
    city.classList.remove('form__error');
  })

});
