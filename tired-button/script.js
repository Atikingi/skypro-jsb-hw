const tiredButtons = document.getElementsByClassName("tired-button")[0];
let prevClickTime = 0;
let clickTimesArr = [];

tiredButtons.onclick = function () {
    let clickTime = +new Date();
    let clicks = +this.dataset.clicks;
  
    clicks += 1;
    this.dataset.clicks = clicks;
    this.textContent = clicks;
  
    prevClickTime = clickTime;
  
    checkClickTime();
  };

const checkClickTime = () => {
  clickTimesArr.push(prevClickTime);

  if (clickTimesArr.length > 2) {
    clickTimesArr.shift();
  }

  if (clickTimesArr[1] - clickTimesArr[0] < 1000) {
    tiredButtons.setAttribute("disabled", "disabled");
    tiredButtons.textContent = "Я устала :(";
    tiredButtons.dataset.clicks = 0;
  }

  if (tiredButtons.getAttribute("disabled")) {
    setTimeout(() => {
      tiredButtons.textContent = "Я готова к тык-тык";
      tiredButtons.removeAttribute("disabled", "disabled");
    }, 1500);
  }
};


