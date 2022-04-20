const showImage = document.getElementById('imageButton');
const image = document.getElementById('hiddenImage')

showImage.onclick = function () {
  image.setAttribute('src', 'https://www.meme-arsenal.com/memes/4bd8fac62cea1dd9df7a0cc1bce9a6b5.jpg');
  showImage.classList.add('hide');
};
