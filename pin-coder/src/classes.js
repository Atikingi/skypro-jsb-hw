class PinCode {
  constructor(element) {
    this.validateProps(element);
    
    this.wrapper = document.querySelector('.container');

    this.renderBlock(pinCodeMap, this.wrapper);

    this.element = element;

    this.pinCodeInput = document.querySelector('.pin-code__input-inner');

    this.checkUserInputData = this.checkUserInputData.bind(this);

    this.pinCodeInput.onkeydown = (event) => {
      return event.code !== 'Space';
    };

    this.pinCodeInput.addEventListener('input', (event) => {
      this.checkUserInputData(event.target);
    });
  }

  renderBlock(block, parent) {
    parent.appendChild(templateEngine(block));
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
  
  validateProps(props) {
  if (!(props instanceof HTMLElement)) {
    throw new Error('Передан не HTML элемент');
  }
}
}

class PinCodeKeyboard extends PinCode {
  constructor(element) {
    super(element);
    this.pinCodeKeyboard = document.querySelector('.pin-code__keyboard');

    this.writePinCode = this.writePinCode.bind(this);

    this.pinCodeKeyboard.addEventListener('click', (event) => {
      this.writePinCode(event);
    });
  }

  writePinCode(event) {
    const { target } = event;
    const keyNumber = target.textContent;
    const inputMaxLength = 6;

    this.pinCodeInput.value.length < inputMaxLength
      ? (this.pinCodeInput.value += keyNumber)
      : (this.pinCodeInput.value = this.pinCodeInput.value);
  }
}

class PinCodeAcceptScreen extends PinCodeKeyboard {
  constructor(element) {
    super(element);

    this.pinCodeAccept = document.querySelector('.pin-code__accept');
  }
}

class AcceptInputs extends PinCodeAcceptScreen {
  generateInputs() {
    this.pinCodeAcceptWrapper = [
      {
        tag: 'div',
        cls: 'pin-code__accept-wrapper',
        content: createPinCodeAccept(),
      },
    ];

    super.renderBlock(this.pinCodeAcceptWrapper, this.pinCodeAccept);
  }
}

class PinCodeButtons extends AcceptInputs {
  constructor(element) {
    super(element);

    this.pinCodeSave = document.querySelector('.pin-code__save');
    this.pinCodeClear = document.querySelector('.pin-code__clear');

    this.savePinCode = this.savePinCode.bind(this);
    this.clearPinCode = this.clearPinCode.bind(this);

    this.pinCodeSave.addEventListener('click', (event) => {
      event.preventDefault();

      if (!this.pinCodeInput.value.length) {
        return;
      }

      this.savePinCode();
      super.generateInputs();
      this.hideElements();
      window.location.reload();
    });

    this.pinCodeClear.addEventListener('click', (event) => {
      event.preventDefault();

      this.clearPinCode();
      this.hideElements();
    });
  }

  savePinCode() {
    localStorage.setItem('userPinCode', this.pinCodeInput.value.toString());
  }

  clearPinCode() {
    localStorage.removeItem('userPinCode');

    this.pinCodeAccept.querySelectorAll('.pin-code__accept-wrapper').forEach((node) => {
      node.remove();
    });

    this.pinCodeInput.value = '';
  }

  hideElements() {
    if (localStorage.getItem('userPinCode')) {
      this.element.querySelector('.pin-code__title').textContent = 'Введите пин-код';
      this.pinCodeInput.classList.add('pin-code__input-inner__hidden');
      this.pinCodeSave.classList.add('pin-code__save__hidden');
      this.pinCodeClear.classList.remove('pin-code__clear__hidden');
      this.pinCodeAccept.classList.remove('pin-code__accept__hidden');
    } else {
      this.element.querySelector('.pin-code__title').textContent =
        'Придумайте и сохраните новый пин-код';
      this.pinCodeInput.classList.remove('pin-code__input-inner__hidden');
      this.pinCodeSave.classList.remove('pin-code__save__hidden');
      this.pinCodeClear.classList.add('pin-code__clear__hidden');
      this.pinCodeAccept.classList.add('pin-code__accept__hidden');
    }
  }
}

class CheckPage extends PinCodeButtons {
  constructor(element) {
    super(element);

    super.hideElements();
    super.generateInputs();
  }
}

class AcceptInputsElements extends CheckPage {
  constructor(element) {
    super(element);

    this.pinCodeInputsWrapper = document.querySelector('.pin-code__accept-wrapper');
    this.pinCodeInputsAccept = document.querySelectorAll('.pin-code__accept-item');
    this.pinCodeFirstInput = document.querySelector('.pin-code__accept-item');
    this.currentInput = this.pinCodeFirstInput;

    this.generatePinCodeScreen();
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
}

class VirtualKeyboardFocus extends AcceptInputsElements {
  constructor(element) {
    super(element);
    this.pinCodeKeyboard.addEventListener('click', (event) => {
      this.writeSingleInputs(event);

      if (this.pinCodeInputsWrapper.lastChild.value) {
        this.pinCodeInputsAccept.forEach((input) => {
          this.pinCodeValue.push(input.value);
        });
      }

      if (this.pinCodeValue.join('') === localStorage.userPinCode) {
        this.showCopyPopup();
      }

      console.log(this.pinCodeValue);
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
}

class PopupMessage extends VirtualKeyboardFocus {
  constructor(element) {
    super(element);

    this.popupMessage = document.querySelector('.content__popup');
    this.copyStatus = document.querySelector('.content__popup');

    this.showCopyPopup = this.showCopyPopup.bind(this);
  }

  showCopyPopup() {
    this.copyStatus.classList.remove('hide');
    setTimeout(() => this.copyStatus.classList.add('hide'), 1500);
  }
}

const pinCodeForm = new PopupMessage(document.querySelector('.container'));
