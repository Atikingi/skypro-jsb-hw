const resultInput = document.querySelector('.shortener__result');
const userURLInput = document.querySelector('.shortener__url-text');
const shortenerButton = document.querySelector('.shortener__button');

function getShortURL(userUrl) {
  const request = new XMLHttpRequest();
  const spinner = document.querySelector('.shortener__spinner');
  const error = document.querySelector('.shortener__error');

  userUrl = userURLInput.value;

  if (!validateInput(userUrl)) {
    shortenerButton.classList.remove('shortener__button__hidden');
    return;
  }

  request.open('GET', `http://tinyurl.com/api-create.php?url=${userUrl}`);
  request.send();

  spinner.classList.remove('shortener__spinner__hidden');

  request.onload = () => {
    const RESULT = request.response;

    if (request.status !== 200) {
      error.classList.remove('shortener__error__hidden');
      showElements(shortenerButton, spinner);
      return;
    }

    showElements(shortenerButton, spinner);

    resultInput.value = RESULT;
  };

  request.onerror = function () {
    error.classList.remove('shortener__error__hidden');
    showElements(shortenerButton, spinner);
  };
}

function validateInput(url) {
  const regex = new RegExp(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/g
  );

  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
}

function showElements(button, spinner) {
  button.classList.toggle('shortener__button__hidden');
  spinner.classList.toggle('shortener__spinner__hidden');
}

shortenerButton.addEventListener('click', (event) => {
  event.preventDefault();

  shortenerButton.classList.add('shortener__button__hidden');
  document.querySelector('.shortener__error').classList.add('shortener__error__hidden');

  getShortURL();
});

document.querySelector('.shortener__copy-button').onclick = () => {
  navigator.clipboard.writeText(resultInput.value);

  document.getElementById('copy-icon').classList.remove('fa-copy');
  document.getElementById('copy-icon').classList.add('fa-check');
  setTimeout(() => {
    document.getElementById('copy-icon').classList.add('fa-copy');
    document.getElementById('copy-icon').classList.remove('fa-check');
  }, 1500);
};
