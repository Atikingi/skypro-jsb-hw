const buttons = document.querySelectorAll('.hello-button');

const helloBox = (event) => {
    const { target } = event;
    const targetParent = target.parentElement;
  
    target.remove();
    
    const newElem = document.createElement('h1');
    newElem.textContent = 'Привет, пользователь!';
    
    targetParent.appendChild(newElem);
}

buttons.forEach ((button) => {
    button.onclick = helloBox;
})
