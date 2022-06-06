export default class PinCodeValidate {
  constructor() {
    this.pinCodeInput = document.querySelector('.pin-code__input-inner');

    this.pinCodeInput.onkeydown = (event) => {
      return this.checkSpace(event);
    };
    this.pinCodeInput.addEventListener('input', (event) => {
      this.checkUserInputData(event.target);
    });
  }

  checkSpace(event) {
    return event.code !== 'Space';
  }

  checkUserInputData(elem) {
    if (isNaN(elem.value)) {
      elem.value = [...elem.value]
        .filter((e) => isFinite(e))
        .join('')
        .replace(/\s/g, '');
      elem.classList.add('pin-code__input-inner__error');
    } else {
      elem.classList.remove('pin-code__input-inner__error');
    }
  }

  clg() {
    console.log('privet');
  }
}
