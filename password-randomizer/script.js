const generatePassword = document.getElementById("passwordButton");

generatePassword.onclick = function () {
  const arrPasswordSymbols = [];
  const passwordSymbols =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const lengthPass = document.getElementById("passwordLength");
  const passwordOutput = document.getElementById("passwordOutput");

  if (lengthPass.value === "" || lengthPass.value < 8 || !isFinite(lengthPass.value)) {
    alert("Длина пароля должна быть не менее 8 символов");
    return;
  }

  for (let i = 0; i < lengthPass.value; i++) {
    let randomNumber = Math.ceil(Math.random() * passwordSymbols.length - 1);
    arrPasswordSymbols.push(passwordSymbols[randomNumber]);
  }

  passwordOutput.value = arrPasswordSymbols.join("");

  return passwordOutput;
};
