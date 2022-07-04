export default class DataAPI {
  API_URL = 'https://jsonplaceholder.typicode.com/';

  getAllPosts(onSuccess) {
    request({
      url: `${this.API_URL}posts`,
      onSuccess: (data) => {
        onSuccess({
          data,
        });
      },
      onError: () => {
        alert('Ошибка сервера');
      },
    });
  }

  createPost(title, text, onSuccess) {
    request({
      url: `${this.API_URL}posts`,
      method: 'POST',
      body: {
        title: title,
        body: text,
      },
      okResponses: [200, 201],
      onSuccess: (data) => {
        const { id, title, body } = data;

        onSuccess({
          id,
          title,
          body,
        });
      },
      onError: () => {
        alert('Ошибка сервера');
      },
    });
  }

  deletePost(id, onSuccess) {
    request({
      url: `${this.API_URL}posts/:${id}`,
      method: 'DELETE',
      okResponses: [200, 201],
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: () => {
        alert('Такого поста не существует');
      },
    });
  }

  editPost(id, title, text) {
    request({
      url: `${this.API_URL}posts/${id}`,
      method: 'PATCH',
      body: {
        title: title,
        body: text,
      },
      okResponses: [200, 201],
      onSuccess: () => {
        console.log('Пост отредактирован');
      },
      onError: () => {
        alert('Ошибка сервера');
      },
    });
  }

  showPost(id, onSuccess) {
    request({
      url: `${this.API_URL}posts/${id}`,
      okResponses: [200, 201],
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: () => {
        alert('Такого поста не существует');
      },
    });
  }
}

const api = new DataAPI();
