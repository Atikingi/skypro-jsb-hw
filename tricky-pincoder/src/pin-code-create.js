import PinCodeStorage from './pin-code-storage.js';
import PinCodeInner from './pin-code-inner.js';

export default class PinCodeCreate {
  constructor(element) {
    this.validateProps(element);

    this.element = element;
    this.wrapper = document.getElementById('container');

    this.renderBlock(PinCodeCreate.template, this.wrapper);

    this.pinCodeSave = document.querySelector('.pin-code__save');
    this.pinCodeInput = document.querySelector('.pin-code__input-inner');
    this.pinCodeClear = document.querySelector('.pin-code__clear');
    this.pinCodeFirstInput = document.querySelector('.pin-code__accept-item');

    this.saveEvent(this.pinCodeSave);
    this.clearEvent(this.pinCodeClear);

    if (localStorage.userPinCode) {
      this.hideElements();
    } else {
      this.showElements();
    }
  }

  saveEvent(saveButton) {
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();

      if (!this.pinCodeInput.value.length) {
        return;
      }
  
      this.hideElements();
      new PinCodeStorage(this.pinCodeInput);
      location.reload();
      new PinCodeInner();

    });
  }

  clearEvent(clearButton) {
    clearButton.addEventListener('click', (event) => {
      event.preventDefault();

      new PinCodeStorage(this.pinCodeInput);
      this.showElements();

      this.removeInnerInputs(this.element)
    });
  }

  removeInnerInputs(element) {
    element.querySelectorAll('.pin-code__accept').forEach((node) => {
      node.remove();
    });
  }

  validateProps(props) {
    if (!(props instanceof HTMLElement)) {
      throw new Error('Передан не HTML элемент');
    }
  }

  renderBlock(block, parent) {
    parent.appendChild(templateEngine(block));
  }

  hideElements() {
    this.element.querySelector('.pin-code__title').textContent = 'Введите пин-код';
    this.pinCodeInput.classList.add('pin-code__input-inner__hidden');
    this.pinCodeSave.classList.add('pin-code__save__hidden');
    this.pinCodeClear.classList.remove('pin-code__clear__hidden');
  }

  showElements() {
    this.element.querySelector('.pin-code__title').textContent =
      'Придумайте и сохраните новый пин-код';
    this.pinCodeInput.classList.remove('pin-code__input-inner__hidden');
    this.pinCodeSave.classList.remove('pin-code__save__hidden');
    this.pinCodeClear.classList.add('pin-code__clear__hidden');
  }
}

PinCodeCreate.template = [
  {
    tag: 'form',
    cls: 'pin-code__content',
    attrs: {
      action: '#',
    },
    content: [
      {
        tag: 'h1',
        cls: 'pin-code__title',
        text: 'Придумайте и сохраните новый пин-код',
      },
      {
        tag: 'input',
        cls: 'pin-code__input-inner',
        attrs: {
          type: 'text',
          placeholder: 'от 1 до 6 цифр',
          maxlength: '6',
          autocomplete: 'off',
        },
        attr: 'required',
      },
      {
        tag: 'div',
        cls: ['pin-code__accept', 'pin-code__accept__hidden'],
        attrs:{
          id: 'pin-code__accept',
        }
      },
      {
        tag: 'button',
        cls: ['pin-code__save', 'pin-code__button'],
        text: 'Сохранить пин-код',
        attrs: {
          type: 'submit',
        },
      },
      {
        tag: 'button',
        cls: ['pin-code__clear', 'pin-code__clear__hidden', 'pin-code__button'],
        text: 'Очистить сохраненный пин-код',
        attrs: {
          type: 'submit',
        },
      },
    ],
  },
];
