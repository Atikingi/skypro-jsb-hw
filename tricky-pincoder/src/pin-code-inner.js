import Popup from './popup.js';
import PincodeInput from '/tricky-pincoder/node_modules/pincode-input/dist/pincode-input.es.js';

export default class PinCodeInner {
  constructor() {
    this.pinCodeAccept = document.querySelector('.pin-code__accept');

    this.template = [
      {
        tag: 'div',
        cls: 'pin-code__accept-wrapper',
        content: this.createPinCodeAccept(),
      },
    ];

    this.generatePinCodeScreen = this.generatePinCodeScreen.bind(this);


    this.pinCodeInputsWrapper = document.querySelector('.pin-code__accept');
    this.pinCodeInputsAccept = document.querySelectorAll('.pincode-input');

    this.pinCodeAccept.classList.remove('pin-code__accept__hidden');

    if (localStorage.userPinCode) {
      this.generatePinCodeScreen();
    }
  }

  renderBlock(block, parent) {
    parent.appendChild(templateEngine(block));
  }

  localStorage(){
    return localStorage.userPinCode.length
  }

  createPinCodeAccept(length) {

    const multiplyBLock = [];

    if (localStorage.userPinCode) {
      length = this.localStorage();
    }else{
      length = document.querySelector('pin-code__input-inner');
    }

    new PincodeInput('#pin-code__accept', {
      count: this.localStorage(),
      secure: false,
      previewDuration: 200,
      onInput: (value) => {
        console.log(value);
      },
    });

    return multiplyBLock;
  }

  generatePinCodeScreen() {

    this.pinCodeInputsAccept.forEach((input) => {
      this.checkInputs(input);
    });
  }

  checkInputs(elem) {
    elem.addEventListener('paste', (event) => {
      const userData = event.clipboardData.getData('text/plain');

      for (let i = 0; i < localStorage.userPinCode.length; i++) {
        this.pinCodeInputsAccept[i].value = userData[i];

        if (i === localStorage.userPinCode.length - 1) {
          this.pinCodeInputsAccept[i].focus();
        }
      }
    });

    elem.addEventListener('input', () => {
      this.pinCodeValue = [];

      if (this.pinCodeInputsWrapper.lastChild.value) {
        this.pinCodeInputsAccept.forEach((input) => {
          this.pinCodeValue.push(input.value);
        });
      }

      if (this.pinCodeValue.join('') === localStorage.userPinCode) {
        new Popup();
      }
    });
  }
}

