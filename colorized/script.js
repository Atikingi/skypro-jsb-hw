const redColor = document.getElementById('addRedColorButton');
const blueColor = document.getElementById('addBlueColorButton');
const greenColor = document.getElementById('addGreenColorButton');
const resetColor = document.getElementById('resetButton');
let colorArr = [0,0,0];
let colorRGBValue;
let rgbColor;


function addRedColor () {
  colorArr[0] += 10;
  colorRGBValue = colorArr.join(',')
  rgbColor = `rgb(${colorRGBValue})`;
  document.body.style.backgroundColor = rgbColor;
};

function addGreenColor () {
  colorArr[1] += 10;
  colorRGBValue = colorArr.join(',')
  rgbColor = `rgb(${colorRGBValue})`;
  document.body.style.backgroundColor = rgbColor;
};

function addBlueColor () {
  colorArr[2] += 10;
  colorRGBValue = colorArr.join(',')
  rgbColor = `rgb(${colorRGBValue})`;
  document.body.style.backgroundColor = rgbColor;
};

function clearColor (){
  colorArr = [0,0,0];
  colorRGBValue = colorArr.join(',')
  rgbColor = `rgb(${colorRGBValue})`;
  document.body.style.backgroundColor = rgbColor;
}

redColor.onclick = addRedColor;
blueColor.onclick = addBlueColor;
greenColor.onclick = addGreenColor;
resetColor.onclick = clearColor;