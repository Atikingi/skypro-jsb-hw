import DataAPI from './api-data.js';
import Router from './routing.js';

export default class PostsRender {
  constructor() {
    this.api = new DataAPI();
    this.router = new Router();
    this.postsList = [];

    this.button = document.getElementById('posts-create');
    this.postsHolder = document.getElementById('posts');

    this.pathHandler();

    window.addEventListener('popstate', () => {
      this.pathHandler();
    });

    this.userTitle = document.getElementById('user-title');
    this.userText = document.getElementById('user-body');

    this.button.addEventListener('click', (event) => {
      event.preventDefault();

      this.renderPost(this.userTitle.value, this.userText.value);
      this.userTitle.value = '';
      this.userText.value = '';
    });

    this.postsHolder.addEventListener('click', (event) => {
      const { target } = event;

      this.clickActionHandler(target);
    });
  }

  getPostsList() {
    this.api.getAllPosts((response) => {
      this.postsList = response.data;
    });
  }

  getDefaultPostsList() {
    this.api.getAllPosts((response) => {
      this.postsList = response.data;

      this.renderAPIPosts();
    });
  }

  renderAPIPosts() {
    this.postsHolder.innerHTML = '';

    for (let i = 0; i < this.postsList.length; i++) {
      this.postsHolder.appendChild(
        templateEngine(
          PostsRender.postTemplate(
            this.postsList[i].id,
            this.postsList[i].title,
            this.postsList[i].body
          )
        )
      );
    }
  }

  deletePostConfirm(post, dataId) {
    post.appendChild(templateEngine(PostsRender.popupTemplate(dataId)));
  }

  deletePost(postId) {
    this.api.deletePost(postId, () => {
      this.postsList = this.postsList.filter((item) => item.id !== postId);

      this.renderAPIPosts();

      history.replaceState(null, null, 'index.html');
    });
  }

  renderPost(title, text) {
    this.api.createPost(title, text, (response) => {
      const { id, title, body } = response;

      this.postsHolder.appendChild(
        templateEngine(PostsRender.postTemplate(id, title, body))
      );
    });
  }

  editPost(target) {
    this.postContent = document.getElementById(target.dataset.id);

    this.postsTitle = this.postContent.getElementsByTagName('h3')[0];
    this.postBody = this.postContent.getElementsByTagName('p')[0];

    if (target.dataset.edit === 'false') {
      target.classList.remove('fa-pencil');
      target.classList.add('fa-circle-check');
      target.dataset.edit = 'true';

      this.postsTitle.setAttribute('contenteditable', '');
      this.postsTitle.setAttribute('data-edit', 'true');
      this.postBody.setAttribute('contenteditable', '');
      this.postBody.setAttribute('data-edit', 'true');

      return;
    }

    if (target.dataset.edit === 'true') {
      target.classList.add('fa-pencil');
      target.classList.remove('fa-circle-check');
      target.dataset.edit = 'false';

      this.postsTitle.setAttribute('contenteditable', 'false');
      this.postsTitle.removeAttribute('data-edit');
      this.postBody.setAttribute('contenteditable', 'false');
      this.postBody.removeAttribute('data-edit');

      this.api.editPost(
        target.dataset.id,
        this.postsTitle.textContent,
        this.postBody.textContent
      );
    }
  }

  openPost(id) {
    this.postsHolder.innerHTML = '';

    this.api.showPost(id, (response) => {
      const { id, title, body } = response;

      this.postsHolder.appendChild(
        templateEngine(PostsRender.postTemplate(id, title, body))
      );
    });
  }

  showPostById() {
    this.getPostsList();

    this.postsList = this.postsList.filter((item) => item.id === this.router.getPageId());

    this.renderAPIPosts();
  }

  pathHandler() {
    if (location.href.includes('id')) {
      this.getPostsList();
      this.openPost(this.router.getPageId());
    } else {
      this.getDefaultPostsList();
    }
  }

  clickActionHandler(target){
    if (target.id === 'posts-delete') {
      this.post = document.getElementById(target.dataset.id);

      this.deletePostConfirm(this.post, this.post.firstChild.id);
    }

    if (target.id === 'post-delete-true') {
      this.deletePost(Number(this.post.id));
    }

    if (target.id === 'post-delete-false') {
      document.getElementById('posts-delete-popup').remove();
      return;
    }

    if (target.id === 'posts-edit') {
      this.editPost(target);
    }

    if (
      (target.dataset.post === 'true' && target.dataset.edit !== 'true') ||
      (target.id === 'post-wrapper' &&
        target.dataset.edit !== 'true' &&
        !location.href.includes('id'))
    ) {
      this.router.changePath(target.dataset.id);

      this.openPost(target.dataset.id);
    }
  }
}

PostsRender.postTemplate = (id, title, body) => [
  {
    tag: 'div',
    cls: 'posts__content-wrapper',
    id: 'post-wrapper',
    attrs: {
      'data-id': id,
    },
    content: [
      {
        tag: 'div',
        cls: 'posts__content',
        id: id,
        attrs: {
          'data-post': true,
          'data-id': id,
        },
        content: [
          {
            tag: 'h3',
            cls: 'posts__title',
            id: 'posts-title',
            text: title,
            attrs: {
              'data-post': true,
              'data-id': id,
            },
          },
          {
            tag: 'p',
            cls: 'posts__description',
            id: 'posts-description',
            text: body,
            attrs: { 'data-post': true, 'data-id': id },
          },
          {
            tag: 'div',
            cls: 'posts__action-wrapper',
            content: [
              {
                tag: 'i',
                cls: ['fa-solid', 'fa-pencil'],
                id: 'posts-edit',
                attrs: {
                  'data-id': id,
                  'data-edit': 'false',
                },
              },
              {
                tag: 'i',
                cls: ['fa-solid', 'fa-trash-can'],
                id: 'posts-delete',
                attrs: {
                  'data-id': id,
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

PostsRender.popupTemplate = (dataId) => [
  {
    tag: 'div',
    cls: 'posts__delete-confirm',
    id: 'posts-delete-popup',
    content: [
      {
        tag: 'p',
        cls: 'posts__delete-confirm-title',
        text: 'Вы действительно хотите удалить пост?',
      },
      {
        tag: 'div',
        cls: 'posts__delete-confirm-wrapper',
        content: [
          {
            tag: 'button',
            cls: 'posts__delete-confirm-button',
            id: 'post-delete-true',
            text: 'Да',
            attrs: {
              'data-id': dataId,
            },
          },
          {
            tag: 'button',
            cls: 'posts__delete-confirm-button',
            id: 'post-delete-false',
            text: 'Нет',
          },
        ],
      },
    ],
  },
];

new PostsRender();
