const targetInput = document.querySelector('.target-input');
const targetInput2 = document.querySelector('.target-input2');
const targetInput3 = document.querySelector('.target-input3');
const targetInput4 = document.querySelector('.target-input4');
const targetForm = document.querySelector('.form');
const nodeInputs = document.querySelector('.find-me');

function getTextOfInputs() {
  let parent = targetInput.parentElement;
  let targetForm;
  let targetFormTag;

  while (targetFormTag !== 'FORM') {
    for (let child of parent.children) {
      if (child.tagName === 'FORM') {
        targetFormTag = child.tagName;
        targetForm = child;
        break;
      }
    }
    parent = parent.parentElement;
  }
  for (let elem of targetForm) {
    if (elem.tagName === 'INPUT') {
      targetInput.value += elem.value;
    }
  }
}

function getTextOfInputs2() {
  const inputsList = targetForm.elements;

  for (let i = 0; i < inputsList.length; i++) {
    targetInput2.value += inputsList[i].value;
  }
}

function getTextOfInputs3() {
  const findMe = targetForm.querySelectorAll('.find-me');

  findMe.forEach((elem) => {
    targetInput3.value += elem.value;
  });
}

function getTextOfInputs4(node) {
  if (node.className === 'find-me') {
    targetInput4.value += node.value;
  }

  if (node.firstChild) {
    getTextOfInputs4(node.firstChild);
  }

  if (node.nextElementSibling !== null) {
    getTextOfInputs4(node.nextElementSibling);
  }
}

targetInput.onclick = getTextOfInputs;
targetInput2.onclick = getTextOfInputs2;
targetInput3.onclick = getTextOfInputs3;
targetInput4.onclick = function () {
  getTextOfInputs4(targetForm);
};

// targetInput.onclick = function() {
//     let timer = document.querySelector('.timer1');
//     const currentTime = +new Date / 1000;
//   for (let i = 0; i < 10000; i++) {
//     getTextOfInputs();
//     console.log(i);
//     if(i === 9999){
//         timer.textContent = `Время выполнения основного задания   ${((+new Date) / 1000) - currentTime} секунд`;
//     }
//   }
// }

// targetInput2.onclick = function() {
//     let timer = document.querySelector('.timer2');
//     const currentTime = +new Date / 1000;
//   for (let i = 0; i < 10000; i++) {
//     getTextOfInputs2();
//     console.log(i);
//     if(i === 9999){
//         timer.textContent = `Время выполнения доп задания №1   ${((+new Date) / 1000) - currentTime} секунд`;
//     }
//   }
// }

// targetInput3.onclick = function() {
//     let timer = document.querySelector('.timer3');
//     const currentTime = +new Date / 1000;
//   for (let i = 0; i < 10000; i++) {
//     getTextOfInputs3();
//     console.log(i);
//     if(i === 9999){
//         timer.textContent = `Время выполнения доп задания №2   ${((+new Date) / 1000) - currentTime} секунд`;
//     }
//   }
// }

// targetInput4.onclick = function () {
//     let timer = document.querySelector('.timer4');
//     const currentTime = +new Date / 1000;
//   for (let i = 0; i < 10000; i++) {
//     getTextOfInputs4(targetForm);
//     console.log(i);
//     if(i === 9999){
//         timer.textContent = `Время выполнения доп задания №3   ${((+new Date) / 1000) - currentTime} секунд`;
//     }
//   }
// };
