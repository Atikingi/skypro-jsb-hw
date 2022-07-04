export default class DataAPI {
  APP_ID =
    'dict.1.1.20220629T191715Z.ac1bfd30ca1d9799.bd0925a73e31782b1965d9f691f0af23e57d5723';
  API_URL = 'https://dictionary.yandex.net/api/v1/dicservice.json';

  checkWord(text, onSuccess) {
    request({
      url: `${this.API_URL}/lookup`,
      method: 'POST',
      body: {
        key: this.APP_ID,
        lang: 'ru-ru',
        text: text,
      },
      requestType: 'urlencoded',
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: () => {
        alert('Ошибка сервера');
      },
    });
  }
}
