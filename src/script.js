document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.title');
  const subtitle = document.querySelector('.subtitle');
  const content = document.querySelector('.content');

  let pageName = location.pathname.slice(1, -5);

  request({
    url: `json/${pageName}.json`,
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

    pageName = target.pathname.slice(1, -5);

    request({
      url: `json/${pageName}.json`,
      onSuccess: (data) => {
        title.textContent = data.title;
        subtitle.textContent = data.subtitle;
        content.innerHTML += data.body;
      },
    });
  });
});
