document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const inputs = document.querySelectorAll(".form__input");
  let valid = true;

  form.addEventListener("submit", (event) => {
    checkInputs();
    if (!valid) {
      event.preventDefault();
    }
  });

  const checkInputs = (e) => {
    inputs.forEach((input) => {
      if (!input.value) {
        input.classList.add("form__input-error");
        valid = false;
      }
    });
  };

  form.addEventListener("change", (event) => {
    const { target } = event;

    target.classList.remove("form__input-error");
    valid = true;
  });
});
