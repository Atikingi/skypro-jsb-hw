const NO_OPERATION = () => {};
const NO_PARAMS = {};

function request({
  method = 'GET',
  url,
  params = NO_PARAMS,
  type = 'json',
  onSuccess = NO_OPERATION,
  onError = NO_OPERATION,
}) {
  const req = new XMLHttpRequest();
  const urlParams = new URLSearchParams(params);
  const queryString = urlParams.toString();

  req.open(method, url + (queryString ? `?${queryString}` : ''));
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
}
