import PinCodeCreate from './pin-code-create.js';
import PinCodeValidate from './pin-code-validate.js';
import PinCodeInner from './pin-code-inner.js';

new PinCodeCreate(document.getElementById('container'));
new PinCodeValidate();

if (localStorage.userPinCode) {
  new PinCodeInner();
}
