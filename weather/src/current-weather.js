import DataAPIWeather from './api-data.js';

export default class CurrentWeather {
  constructor() {
    this.API_DATA = new DataAPIWeather();

    this.tempValue = document.getElementById('weather-temperature');
    this.iconWeather = document.getElementById('weather-icon');
    this.button = document.getElementById('suggest-button');
    this.cityName = document.getElementById('suggest-input');
    this.weatherType = document.getElementById('weather-type');
    this.windValue = document.getElementById('weather-wind');
    this.humidityValue = document.getElementById('weather-humidity');

    this.button.addEventListener('click', () => {
      this.getCurrentPosition();
    });

    this.renderCityWeather(this.cityName.value);
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((data) => {
      let { latitude, longitude } = data.coords;

      this.API_DATA.getCurrentCityName(latitude, longitude, (response) => {
        this.cityName.value = response;
      });

      this.renderCurrentCityWeather(latitude, longitude);
    });
  }

  renderCurrentCityWeather(lat, lon) {
    this.API_DATA.getWeatherData(lat, lon, (response) => {
      const { iconUrl, temperature, windSpeed, humidity, weatherType } = response;

      this.tempValue.textContent = temperature;
      this.iconWeather.setAttribute('src', iconUrl);
      this.windValue.textContent = windSpeed;
      this.humidityValue.textContent = humidity;
      this.weatherType.textContent = weatherType;
    });
  }

  renderCityWeather(city) {
    this.API_DATA.getCurrentWeather(city, (response) => {
      const { lat, lon } = response;

      this.renderCurrentCityWeather(lat, lon);
    });
  }
}
