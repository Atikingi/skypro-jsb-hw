const box = document.querySelector('.box');
const button = document.querySelector('.hello-button');

const helloBox = (event) => {
    const target = event.target;
    
    target.remove();
    const newElem = document.createElement('h1');
    newElem.textContent = 'Привет, пользователь!';
    box.appendChild(newElem);
}

button.onclick = helloBox;