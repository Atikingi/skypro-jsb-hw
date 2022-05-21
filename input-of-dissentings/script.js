document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const symbolsRU = [
    'ц',
    'к',
    'н',
    'г',
    'ш',
    'щ',
    'з',
    'х',
    'ф',
    'в',
    'п',
    'р',
    'л',
    'д',
    'ж',
    'ч',
    'с',
    'м',
    'т',
    'б',
  ];
  const symbolsEN = [
    'q',
    'w',
    'r',
    't',
    'p',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
  ];

  const checkSymbols = (word) => {
    const errorMessage = document.querySelector('.error');

    if (!symbolsRU.includes(word.key) && !symbolsEN.includes(word.key)) {
      errorMessage.classList.add('error__hidden');
      return;
    }

    word.preventDefault();

    errorMessage.classList.remove('error__hidden');
  };

  const checkInput = (data) => {
    let arr = data.value.split('');

    arr.map((e) => {
      if (symbolsRU.includes(e.toLowerCase()) || symbolsEN.includes(e.toLowerCase())) {
        arr.splice(arr.indexOf(e), 1, '');
      }
    });

    // arr = arr.filter(Boolean); //если нужно убираем пробелы из массива, даже с учетом того что join уберет их из строки
    data.value = arr.join('');
  };

  container.addEventListener('input', (event) => {
    const { target } = event;

    checkInput(target);
  });

  container.addEventListener('keypress', (event) => {
    checkSymbols(event);
  });
});
