export default class DataAPIWeather {
  APP_ID = '9a3ad09b825a06c0667adeea7504e7c6';
  API_URL = 'http://api.openweathermap.org';

  getCurrentWeather(city, onSuccess) {
    const numberOfResponse = 1;

    request({
      url: `${this.API_URL}/geo/1.0/direct`,
      params: {
        q: city,
        limit: numberOfResponse,
        appid: this.APP_ID,
      },
      onSuccess: (data) => {
        const [responseCityObject] = data;

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
    
    request({
      url: `${this.API_URL}/data/2.5/weather`,
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
    const numberOfResponse = 1;

    request({
      url: `${this.API_URL}/geo/1.0/reverse`,
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
