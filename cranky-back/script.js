const inputForm = document.querySelector('.box-form');
const textInput = inputForm.querySelectorAll('.please-input');
const pleaseButton = inputForm.querySelector('.please-text');
const backButton = document.querySelector('.back-button');

pleaseButton.onclick = function () {
  for (let inp of textInput) {
    inp.value = 'Пожалуйста';
  }
};

backButton.onclick = function () {
  for (let inp of textInput) {
    if (inp.value !== 'Пожалуйста') {
     return alert('Проси больше! >:-[');
    }
  }
};
