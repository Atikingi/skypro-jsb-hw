const noOperation = () => {};

function request ({
    method = 'GET',
    url,
    type = 'json',
    onSuccess = noOperation,
    onError = noOperation,
  }){
    const req = new XMLHttpRequest();

    req.open(method, url);
    req.responseType = type;

    req.onload = (event) => {
      const { target } = event;

      if (target.status !== 200) {
        onError(target.statusText);

        return;
      }

      onSuccess(target.response);
    };

    req.onerror = () => {
      onError(() => {
        console.log('Непредвиденная ошибка. Попробуйте позже.');
      });

      return;
    };

    req.send();
  };