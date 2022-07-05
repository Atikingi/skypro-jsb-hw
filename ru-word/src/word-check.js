import DataAPI from './api-data.js';

class WordChecker {
  constructor() {
    this.api = new DataAPI();

    this.result = document.getElementById('word-title');
    this.button = document.getElementById('word-send');
    this.testedWord = document.getElementById('word-text');

    this.button.addEventListener('click', (event) => {
      event.preventDefault();

      this.renderResult();
    });
  }

  renderResult() {
    this.api.checkWord(this.testedWord.value, (response) => {
      this.button.setAttribute('disabled', 'disabled');
      if (!response.def.length) {
        this.result.textContent = 'Такого слова нет в русском языке';
        this.result.style.color = 'red';

        this.refreshTitle();
      } else {
        this.result.textContent = 'Такое слово есть в русском языке';
        this.result.style.color = 'green';

        this.refreshTitle();
      }
    });
  }

  refreshTitle() {
    setTimeout(() => {
      this.result.textContent = 'Проверить наличие слова в русском языке';
      this.result.style.color = 'black';
      this.button.removeAttribute('disabled');
    }, 2000);
  }
}

new WordChecker();
