const colorBox = document.getElementsByClassName('color-box')[0];
const colorSpan = document.getElementsByClassName('color-value')[0];
let changeColorInterval;

function getRandomColor() {
  const colorSymbols = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  let colorValue = [];

  for (let i = 0; i < 6; i++) {
    let randomNumber = Math.floor(Math.random((a, b) => a - b) * colorSymbols.length);
    colorValue.push(colorSymbols[randomNumber]);
  }

  colorBox.onclick = function () {
    clearInterval(changeColorInterval);
    colorSpan.textContent = `#${colorValue.join("")}`;
  };

  return (colorBox.style.background = `#${colorValue.join("")}`);
}

changeColorInterval = setInterval(() => {
    getRandomColor();
  }, 100);