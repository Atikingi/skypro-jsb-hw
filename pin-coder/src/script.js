class pinCode {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Передан не HTML элемент');
    }

    this.wrapper = document.querySelector('.container');

    this.renderBlock(pinCodeMap, this.wrapper);

    this.element = element;

    this.pinCodeInput = document.querySelector('.pin-code__input-inner');
    this.pinCodeKeyboard = document.querySelector('.pin-code__keyboard');
    this.pinCodeKeys = document.querySelectorAll('.pin-code__keyboard-item');
    this.pinCodeClear = document.querySelector('.pin-code__clear');
    this.pinCodeSave = document.querySelector('.pin-code__save');
    this.pinCodeAccept = document.querySelector('.pin-code__accept');
    this.popupMessage = document.querySelector('.content__popup');
    this.copyStatus = document.querySelector('.content__popup');

    this.writePinCode = this.writePinCode.bind(this);
    this.savePinCode = this.savePinCode.bind(this);
    this.clearPinCode = this.clearPinCode.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.writeSingleInputs = this.writeSingleInputs.bind(this);
    this.generatePinCodeScreen = this.generatePinCodeScreen.bind(this);
    this.checkUserInputData = this.checkUserInputData.bind(this);
    this.showCopyPopup = this.showCopyPopup.bind(this);

    this.checkLocalStorage();

    if (localStorage.userPinCode) {
      this.pinCodeAcceptWrapper = [
        {
          tag: 'div',
          cls: 'pin-code__accept-wrapper',
          content: createPinCodeAccept(),
        },
      ];

      this.renderBlock(this.pinCodeAcceptWrapper, this.pinCodeAccept);

      this.generatePinCodeScreen();
    }

    this.pinCodeInput.onkeydown = (event) => {
      return event.which !== 32;
    };

    this.pinCodeKeys.forEach((key) => {
      key.addEventListener('click', (event) => {
        if (localStorage.userPinCode) {
          this.writeSingleInputs(event);
        }

        this.pinCodeInput.focus();
        this.writePinCode(event);

        if (this.pinCodeInputsWrapper.lastChild.value) {
          this.pinCodeInputsAccept.forEach((input) => {
            this.pinCodeValue.push(input.value);
          });
        }

        if (this.pinCodeValue.join('') === localStorage.userPinCode) {
          this.showCopyPopup();
        }
      });
    });

    this.pinCodeClear.addEventListener('click', (event) => {
      event.preventDefault();

      this.clearPinCode();
      this.checkLocalStorage();
    });

    this.pinCodeSave.addEventListener('click', (event) => {
      event.preventDefault();

      if (!this.pinCodeInput.value.length) {
        return;
      }

      this.pinCodeAcceptWrapper = [
        {
          tag: 'div',
          cls: 'pin-code__accept-wrapper',
          content: createPinCodeAccept(),
        },
      ];

      this.renderBlock(this.pinCodeAcceptWrapper, this.pinCodeAccept);

      this.savePinCode();
      this.checkLocalStorage();
      this.generatePinCodeScreen();
    });

    this.pinCodeInput.addEventListener('input', (event) => {
      this.checkUserInputData(event.target);
    });
  }

  renderBlock(block, parent) {
    parent.appendChild(templateEngine(block));
  }

  writePinCode(event) {
    const { target } = event;
    const keyNumber = target.textContent;

    this.pinCodeInput.value.length < 6
      ? (this.pinCodeInput.value += keyNumber)
      : (this.pinCodeInput.value = this.pinCodeInput.value);
  }

  clearPinCode() {
    localStorage.removeItem('userPinCode');

    this.pinCodeAccept.querySelectorAll('.pin-code__accept-wrapper').forEach((node) => {
      node.remove();
    });

    this.checkLocalStorage();
    this.pinCodeInput.value = '';
  }

  savePinCode() {
    this.checkLocalStorage();
    localStorage.setItem('userPinCode', this.pinCodeInput.value.toString());
  }

  checkLocalStorage() {
    if (localStorage.getItem('userPinCode')) {
      this.element.querySelector('.pin-code__title').textContent = 'Введите пин-код';
      this.pinCodeAccept.classList.remove('pin-code__accept__hidden');
      this.pinCodeClear.classList.remove('pin-code__clear__hidden');
      this.pinCodeInput.classList.add('pin-code__input-inner__hidden');
      this.pinCodeSave.classList.add('pin-code__save__hidden');
    } else {
      this.element.querySelector('.pin-code__title').textContent =
        'Придумайте и сохраните новый пин-код';
      this.pinCodeAccept.classList.add('pin-code__accept__hidden');
      this.pinCodeClear.classList.add('pin-code__clear__hidden');
      this.pinCodeInput.classList.remove('pin-code__input-inner__hidden');
      this.pinCodeSave.classList.remove('pin-code__save__hidden');
    }
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

    elem.addEventListener('input', (event) => {
      this.checkUserInputData(event.target);
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
        this.showCopyPopup();
      }
    });
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
    this.pinCodeInputsWrapper = document.querySelector('.pin-code__accept-wrapper');
    this.pinCodeInputsAccept = document.querySelectorAll('.pin-code__accept-item');
    this.pinCodeFirstInput = document.querySelector('.pin-code__accept-item');
    this.currentInput = this.pinCodeFirstInput;

    this.pinCodeFirstInput.focus();

    this.pinCodeInputsAccept.forEach((input) => {
      this.checkInputs(input);

      input.addEventListener('focus', () => {
        this.currentInput = input;
        input.focus();
      });
    });
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
      console.log(this.pinCodeValue);
    }
  }

  showCopyPopup() {
    this.copyStatus.classList.remove('hide');
    setTimeout(() => this.copyStatus.classList.add('hide'), 1500);
  }
}

const pinCodeForm = new pinCode(document.querySelector('.container'));
