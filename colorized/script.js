const redColor = document.getElementById('addRedColorButton');
const blueColor = document.getElementById('addBlueColorButton');
const greenColor = document.getElementById('addGreenColorButton');
const resetColor = document.getElementById('resetButton');
const colorArr = [0,0,0];
let colorRGBValue;
let rgbColor;


const addColor = (color) => {
  colorArr[color] += 10;
  colorRGBValue = colorArr.join(",");
  rgbColor = `rgb(${colorRGBValue})`;
  document.body.style.backgroundColor = rgbColor;
}

function addRedColor () {
  addColor(0);
};

function addGreenColor () {
  addColor(1);
};

function addBlueColor () {
  addColor(2);
};

function clearColor (){
  colorArr.forEach((el) => el = 0);
  document.body.style.backgroundColor = `rgb(0,0,0)`;
}

redColor.onclick = addRedColor;
blueColor.onclick = addBlueColor;
greenColor.onclick = addGreenColor;
resetColor.onclick = clearColor;