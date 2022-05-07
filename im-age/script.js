function addImage() {
  document.onclick = function (elem) {
    navigator.clipboard.writeText(elem.target.src);
  };

  const main = document.querySelector('.main');

  const loaderBox = document.createElement('div');
  loaderBox.classList.add('loader-box');

  const loader = document.createElement('img');
  loader.setAttribute('src', './spinning-circles.svg');
  loader.classList.add('loader');

  document.addEventListener('DOMContentLoaded', function () {
    main.appendChild(loaderBox);
    loaderBox.appendChild(loader);
  });

  const bigImage = document.createElement('img');
  bigImage.classList.add('big-image');
  bigImage.setAttribute(
    'src',
    'https://oboi.ws/originals/original_2626_oboi_nosopyrka_2560x2048.jpg'
  );

  bigImage.onload = function () {
    loaderBox.remove();
    main.appendChild(bigImage);
  };
}

addImage();

//Если делать без замедления сети, то не успевает отрабатывать функция в плане удаления загрузчика
//Добавил этот способ, который работает если не использовать замедление сети
window.onload = function () {
  document.querySelector('.loader-box').remove();
};
