document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const content = document.querySelector('.content');

    request({
        url: 'index.json',
        onSuccess: (data) => {
            title.textContent = data.title;
            subtitle.textContent = data.subtitle;
            content.textContent = data.body;
        },
    })
});

