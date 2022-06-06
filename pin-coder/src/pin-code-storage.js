export default class PinCodeStorage {
  constructor(input) {
    if (!localStorage.userPinCode) {
      this.savePinCode(input);
    }else{
        this.clearPinCode(input);
    }
  }
  savePinCode(currentInput) {
    if (!localStorage.userPinCode) {
      localStorage.setItem('userPinCode', currentInput.value.toString());
    }
  }

  clearPinCode(currentInput) {
    localStorage.removeItem('userPinCode');

    currentInput.value = '';
  }
}
