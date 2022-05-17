const button = document.querySelector('.hello-button');
let opacityValue = 1;

const helloBox = (event) => {
  const target = event.target;

  if (opacityValue < 0.2) {
    return (target.textContent = 'Я не исчезну!!!');
  }

  opacityValue /= 2;
  target.style.opacity = opacityValue;
};



button.addEventListener ('click', helloBox);
