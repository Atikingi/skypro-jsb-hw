// const pinCodeAcceptWrapper = [{
//   tag: 'div',
//   cls: 'pin-code__accept-wrapper',
//   content: createPinCodeAccept(),
// }]

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
    this.pinCodeInputsAccept = document.querySelectorAll('.pin-code__accept-item');
    this.pinCodeFirstInput = document.querySelector('.pin-code__accept-item');

    this.writePinCode = this.writePinCode.bind(this);
    this.savePinCode = this.savePinCode.bind(this);
    this.clearPinCode = this.clearPinCode.bind(this);

    this.checkLocalStorage();

    this.inputOnFocus;

    if (localStorage.userPinCode) {
      this.pinCodeAcceptWrapper = [
        {
          tag: 'div',
          cls: 'pin-code__accept-wrapper',
          content: createPinCodeAccept((length = localStorage.userPinCode.length)),
        },
      ];

      this.renderBlock(this.pinCodeAcceptWrapper, this.pinCodeAccept);
    }

    this.pinCodeKeys.forEach((key) => {
      key.addEventListener('click', (event) => {
        if (localStorage.userPinCode) {
          // if(document.querySelector('.pin-code__accept-item').value.length){
          //   document.querySelector('.pin-code__accept-item').nextElementSibling.focus();
          // }else{
          //   document.querySelector('.pin-code__accept-item').focus();
          // }

          Array.from(document.querySelectorAll('.pin-code__accept-item')).reverse().find((input) => {
            if (!input.value.length){
              console.log('ntq');
              this.writePinCode(event);
              return input.focus();
             }
          })
          
          this.writePinCode(event);
          return;
        }

        this.pinCodeInput.focus();
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

      this.savePinCode();
      this.checkLocalStorage();
    });
  }

  renderBlock(block, parent) {
    parent.appendChild(templateEngine(block));
  }

  writePinCode(event) {
    const { target } = event;
    const keyNumber = target.textContent;

    if (localStorage.userPinCode) {
      document.querySelectorAll('.pin-code__accept-item').forEach((input) => {
        input.onfocus = () => {
          input.value = keyNumber;
        }
      })
        
      }



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
    this.renderBlock(this.pinCodeAcceptWrapper, this.pinCodeAccept);
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
}

const pinCodeForm = new pinCode(document.querySelector('.container'));
