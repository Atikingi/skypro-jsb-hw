export default class PinCodeKeyboard {
  constructor(keyboard, currentInput) {
    keyboard.addEventListener('click', (event) => {
      if (!localStorage.userPinCode) {
        this.writePinCode(event, currentInput);
      }
    });
  }

  writePinCode(event, input) {
    const { target } = event;
    const keyNumber = target.textContent;
    const inputMaxLength = 6;

    input.value.length < inputMaxLength
      ? (input.value += keyNumber)
      : (input.value = input.value);
  }
}
