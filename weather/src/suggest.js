import CurrentWeather from './current-weather.js';

class Suggest {
  constructor() {
    this.cityValue = document.querySelector('.suggest__input');
    this.renderSuggestPopup();

    this.suggest = document.querySelector('.suggest__popup');

    this.getPosition(this.cityValue, this.suggest);

    this.getCities();
    this.cityArr = [];

    new CurrentWeather();

    this.cityValue.addEventListener('input', (event) => {
      if (event.target.value === '') {
        this.clearSuggest();
        this.hidePopup();
        return;
      }

      this.renderSuggestItems();
      this.showPopup();
    });

    document.body.addEventListener('click', (event) => {
      if (!event.target.classList.contains('suggest__popup-item')) {
        this.hidePopup();
        return;
      }
    });

    this.suggest.addEventListener('click', (event) => {
      const { target } = event;

      if (!target.classList.contains('suggest__popup-item')) {
        this.hidePopup();
        return;
      }

      this.writeCityName(target, this.cityValue);
      this.hidePopup();
      new CurrentWeather();
    });
  }

  getCities() {
    request({
      url: '/weather/src/json/cities.json',
      onSuccess: (data) => {
        data.city.forEach((city) => {
          this.cityArr.push(city.name);
        });
      },
    });
  }

  renderSuggestPopup() {
    document.body.appendChild(templateEngine(Suggest.templatePopup));
  }

  renderSuggestItems() {
    this.clearSuggest();

    this.cityArrSort = this.cityArr.filter((city) =>
      city.toLowerCase().startsWith(this.cityValue.value.toLowerCase())
    );

    if (this.cityArrSort.length) {
      this.suggest.appendChild(
        templateEngine(Suggest.templateSuggestItem(this.cityArrSort))
      );
    }
  }

  clearSuggest() {
    if (!this.suggest) {
      return;
    }

    this.suggest.innerHTML = '';
  }

  writeCityName(suggest, cityField) {
    cityField.value = suggest.textContent;

    this.clearSuggest();
  }

  getPosition(startElement, popup) {
    const coords = startElement.getBoundingClientRect();

    const { bottom, left } = coords;

    popup.style.top = bottom + this.cityValue.offsetHeight * 2 + 'px';
    popup.style.left = left + 'px';
  }

  showPopup() {
    this.suggest.classList.remove('suggest__popup__hidden');
  }

  hidePopup() {
    this.suggest.classList.add('suggest__popup__hidden');
  }
}

Suggest.templatePopup = [
  {
    tag: 'div',
    cls: ['suggest__popup', 'suggest__popup__hidden'],
  },
];

Suggest.templateSuggestItem = (suggests) =>
  suggests.map((item) => ({
    tag: 'div',
    cls: 'suggest__popup-item',
    content: item,
  }));

const getCity = new Suggest();
