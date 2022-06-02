class pinCode {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Передан не HTML элемент');
    }

    this.element = element;

    this.pinCodeInput = document.querySelector('.pin-code__input-inner');
    this.pinCodeKeyboard = document.querySelector('.pin-code__keyboard');
    this.pinCodeKeys = document.querySelectorAll('.pin-code__keyboard-item');
    this.pinCodeClear = document.querySelector('.pin-code__clear');
    this.pinCodeSave = document.querySelector('.pin-code__save');
    this.pinCodeAccept = document.querySelector('.pin-code__accept');

    this.writePinCode = this.writePinCode.bind(this);
    this.savePinCode = this.savePinCode.bind(this);

    this.renderBlock(pinCodeMap);

    this.checkLocalStorage();

    this.pinCodeKeys.forEach((key) => {
      key.addEventListener('click', (event) => {
        this.writePinCode(event);
      });
    });

    this.pinCodeClear.addEventListener('click', (event) => {
      event.preventDefault();

      this.clearPinCode();
      this.checkLocalStorage();
    });

    this.pinCodeSave.addEventListener('click', (event) => {
      event.preventDefault();

      this.savePinCode();
      this.checkLocalStorage();
    });
  }

  renderBlock(block) {
    document.querySelector('.container').appendChild(templateEngine(block));
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
    this.checkLocalStorage();
  }

  savePinCode() {
    localStorage.setItem('userPinCode', this.pinCodeInput.value.toString());
    this.pinCodeInput.value = '';
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
}

const pinCodeForm = new pinCode(document.querySelector('.container'));
