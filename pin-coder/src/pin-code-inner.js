import Popup from './popup.js';

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

    this.renderBlock(this.template, this.pinCodeAccept);

    this.generatePinCodeScreen = this.generatePinCodeScreen.bind(this);

    this.pinCodeKeyboard = document.querySelector('.pin-code__keyboard');
    this.pinCodeInputsWrapper = document.querySelector('.pin-code__accept-wrapper');
    this.pinCodeFirstInput = document.querySelector('.pin-code__accept-item');
    this.pinCodeInputsAccept = document.querySelectorAll('.pin-code__accept-item');
    this.currentInput = this.pinCodeFirstInput;

    this.pinCodeAccept.classList.remove('pin-code__accept__hidden');

    this.pinCodeKeyboard.addEventListener('click', (event) => {
      if (localStorage.userPinCode) {
        this.writeSingleInputs(event);

        if (this.pinCodeInputsWrapper.lastChild.value) {
          this.pinCodeInputsAccept.forEach((input) => {
            this.pinCodeValue.push(input.value);
          });
        }
      }

      if (this.pinCodeValue.join('') === localStorage.userPinCode) {
        new Popup();
      }
    });

    if (localStorage.userPinCode) {
      this.generatePinCodeScreen();
    }
  }

  renderBlock(block, parent) {
    parent.appendChild(templateEngine(block));
  }

  createPinCodeAccept(length) {
    const multiplyBLock = [];

    if (localStorage.userPinCode) {
      length = localStorage.userPinCode.length;
    }

    for (let i = 0; i < length; i++) {
      multiplyBLock[i] = {
        tag: 'input',
        cls: 'pin-code__accept-item',
        attrs: { type: 'text', maxlength: '1' },
      };
    }

    return multiplyBLock;
  }

  writeSingleInputs(event) {
    const { target } = event;
    const keyNumber = target.textContent;
    this.pinCodeValue = [];

    if (!this.currentInput.nextElementSibling) {
      this.currentInput.value = keyNumber;
      return;
    }

    this.currentInput.value = keyNumber;

    this.currentInput.nextElementSibling.focus();
  }

  generatePinCodeScreen() {
    this.pinCodeFirstInput.focus();

    this.pinCodeInputsAccept.forEach((input) => {
      this.checkInputs(input);

      input.addEventListener('focus', () => {
        this.currentInput = input;
        input.focus();
      });
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

      document.onkeydown = (e) => {
        if (e.key === 'Backspace' && elem.previousElementSibling) {
          elem.value = '';
          elem.classList.remove('pin-code__input-inner__error');
          elem.previousElementSibling.focus();
        }
      };

      if (elem.value.length === 1 && elem.nextElementSibling) {
        elem.nextElementSibling.focus();
      }

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
