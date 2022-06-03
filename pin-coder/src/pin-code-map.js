function createPinCodeAccept(length) {
  let multiplyBLock = [];
  length = localStorage.userPinCode
    ? localStorage.userPinCode.length
    : document.querySelector('.pin-code__input-inner').value.length;

  for (let i = 0; i < length; i++) {
    multiplyBLock[i] = {
      tag: 'input',
      cls: 'pin-code__accept-item',
      attrs: { type: 'text' },
    };
  }
  return multiplyBLock;
}

function createPinCodeKeyboard() {
  let pinCodeKeyBoardArray = [];

  for (let i = 1; i <= 10; i++) {
    if (i === 10) {
      pinCodeKeyBoardArray[i] = { tag: 'div', cls: 'pin-code__keyboard-item', text: '0' };
      break;
    } else {
      pinCodeKeyBoardArray[i] = { tag: 'div', cls: 'pin-code__keyboard-item', text: [i] };
    }
  }

  return pinCodeKeyBoardArray;
}

const pinCodeMap = [
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
          placeholder: '6 цифр',
          maxlength: '6',
          autocomplete: 'off',
        },
        attr: 'required',
      },
      {
        tag: 'div',
        cls: ['pin-code__accept', 'pin-code__accept__hidden'],
      },
      {
        tag: 'div',
        cls: 'pin-code__keyboard',
        content: createPinCodeKeyboard(),
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
