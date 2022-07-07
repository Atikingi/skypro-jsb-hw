export default class Popup {
  constructor() {
    this.popupMessage = document.querySelector('.content__popup');

    this.showCopyPopup();
  }

  showCopyPopup() {
    this.popupMessage.classList.remove('hide');
    setTimeout(() => this.popupMessage.classList.add('hide'), 1500);
  }
}
