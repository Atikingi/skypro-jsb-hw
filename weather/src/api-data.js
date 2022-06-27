export default class DataAPIWeather {
  constructor() {
    this.APP_ID = '9a3ad09b825a06c0667adeea7504e7c6';
  }

  getCurrentWeather(city, onSuccess) {
    const API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
    const numberOfResponse = 1;

    request({
      url: API_URL,
      params: {
        q: city,
        limit: numberOfResponse,
        appid: this.APP_ID,
      },
      onSuccess: (data) => {
        const responseCityObject = data[0];

        if (responseCityObject) {
          onSuccess(responseCityObject);
        } else {
          alert('некорректный город');
          return;
        }
      },
      onError: () => {
        alert('некорректный город');
      },
    });
  }

  getWeatherData(lat, lon, onSuccess) {
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

    request({
      url: API_URL,
      params: {
        lat: lat,
        lon: lon,
        appid: this.APP_ID,
      },
      onSuccess: (data) => {
        const iconCode = data.weather[0].icon;
        const iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
        const temperature = `${Math.ceil(data.main.temp_min - 273.15)} °C`;
        const windSpeed = `${data.wind.speed} м/с`;
        const humidity = `${data.main.humidity}%`;
        const weatherType = `${data.weather[0].main}, ${data.weather[0].description}`;

        onSuccess({
          iconUrl,
          temperature,
          windSpeed,
          humidity,
          weatherType,
        });
      },
      onError: () => {
        alert('Ошибка сервера');
      },
    });
  }

  getCurrentCityName(lat, lon, onSuccess) {
    const API_URL = 'http://api.openweathermap.org/geo/1.0/reverse';
    const numberOfResponse = 1;

    request({
      url: API_URL,
      params: {
        lat: lat,
        lon: lon,
        limit: numberOfResponse,
        appid: this.APP_ID,
      },
      onSuccess: (data) => {
        const cityRUName = data[0].local_names.ru;
        onSuccess(cityRUName);
      },
    });
  }
}
