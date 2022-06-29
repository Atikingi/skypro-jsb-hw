function sendForm(login, password) {
  const errorMessage = document.querySelector('.sign-in__status');
  errorMessage.classList.add('sign-in__status__hidden');

  request({
    url: '/sign-in/stubs/api.json',
    params: {
      login: login,
      password: password,
    },
    onSuccess: (data) => {
      if (data.status === 'ok') {
        errorMessage.textContent = 'Вы успешно вошли';
        errorMessage.classList.remove('sign-in__status__hidden');
      } else {
        errorMessage.textContent = 'Вы ввели неверный логин или пароль';
        errorMessage.classList.remove('sign-in__status__hidden');
      }
    },
    onError: () => {
      errorMessage.textContent = 'Проблемы на сервере';
      errorMessage.classList.remove('sign-in__status__hidden');
    },
  });
}

const signInButton = document.querySelector('.sign-in__button');

signInButton.addEventListener('click', () => {
  const userLogin = document.querySelector('.sign-in__input-login').value;
  const password = document.querySelector('.sign-in__input-password').value;

  sendForm(userLogin, password);
});
