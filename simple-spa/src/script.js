document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.title');
  const subtitle = document.querySelector('.subtitle');
  const content = document.querySelector('.content');

  const sliceURL = (target) => {
    return target.pathname.slice(26, -5);
  }

  request({
    url: `json/${sliceURL(location)}.json`,
    onSuccess: (data) => {
      title.textContent = data.title;
      subtitle.textContent = data.subtitle;
      content.innerHTML += data.body;
    },
  });

  content.addEventListener('click', (event) => {
    event.preventDefault();

    const { target } = event;

    content.innerHTML = '';

    history.pushState(null, null, target.href);

    request({
      url: `json/${sliceURL(target)}.json`,
      onSuccess: (data) => {
        title.textContent = data.title;
        subtitle.textContent = data.subtitle;
        content.innerHTML += data.body;
      },
    });
  });
});
