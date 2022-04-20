const textForChange = document.getElementById("inputForChange");
const title = document.getElementById('dynamic-title');
const changeTitle = document.getElementById('changeButton');

changeTitle.onclick = function () {
  title.textContent = textForChange.value;
};
