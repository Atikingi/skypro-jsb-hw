const windValue = document.querySelector('.weather__wind');
const humidityValue = document.querySelector('.weather__humidity');

export default class CurrentWeather {
  constructor() {
    this.tempValue = document.querySelector('.weather__temperature');
    this.iconWeather = document.querySelector('.weather__icon');
    this.button = document.querySelector('.suggest__button');
    this.cityName = document.querySelector('.suggest__input');
    this.weatherType = document.querySelector('.weather__weather-type');

    this.APP_ID = '9a3ad09b825a06c0667adeea7504e7c6';

    this.button.addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition((data) => {
        let latitude = data.coords.latitude;
        let longitude = data.coords.longitude;

        this.getCurrentCItyName(latitude, longitude);
        this.getWeatherData(this.tempValue, latitude, longitude);
      });
    });

    this.getCurrentWeather(this.cityName.value);
  }

  getCurrentWeather(city) {
    request({
      //   url: '/weather/src/stubs/moscow.json',
      url: 'http://api.openweathermap.org/geo/1.0/direct',
      params: {
        q: city,
        limit: 1,
        appid: this.APP_ID,
      },
      onSuccess: (data) => {
        if (data[0]) {
          this.lat = data[0].lat;
          this.lon = data[0].lon;
          this.getWeatherData(this.tempValue, this.lat, this.lon);
        } else {
          console.log('некорректный город');
          return;
        }
      },
      onError: () => {
        console.log('некорректный город');
      },
    });
  }

  getWeatherData(tempField, lat, lon) {
    request({
      //   url: '/weather/src/stubs/moscow-weather.json',
      url: 'https://api.openweathermap.org/data/2.5/weather',
      params: {
        lat: lat,
        lon: lon,
        appid: this.APP_ID,
      },
      onSuccess: (data) => {
        const iconCode = data.weather[0].icon;
        const iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
        const temp = `${Math.ceil(data.main.temp_min - 273.15)} °C`;

        tempField.textContent = temp;
        this.iconWeather.setAttribute('src', iconUrl);
        windValue.textContent = `${data.wind.speed} м/с`;
        humidityValue.textContent = `${data.main.humidity}%`;
        this.weatherType.textContent = `${data.weather[0].main}, ${data.weather[0].description}`;
      },
      onError: () => {
        console.log('Ошибка сервера');
      },
    });
  }

  getCurrentCItyName(lat, lon) {
    request({
      url: 'http://api.openweathermap.org/geo/1.0/reverse',
      params: {
        lat: lat,
        lon: lon,
        limit: 1,
        appid: this.APP_ID,
      },
      onSuccess: (data) => {
        this.cityName.value = data[0].local_names.ru;
      },
    });
  }
}
