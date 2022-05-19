const button = document.querySelector('.hello-button');
let opacityValue = 1;

const helloBox = (event) => {
  const { target } = event;

  if (opacityValue < 0.2) {
    target.textContent = 'Я не исчезну!!!'
    
    return;
  }

  opacityValue /= 2;
  target.style.opacity = opacityValue;
};



button.addEventListener ('click', helloBox);
