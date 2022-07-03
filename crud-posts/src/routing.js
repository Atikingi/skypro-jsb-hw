export default class Router {
  changePath(id) {
    history.pushState(null, null, `?id=${id}`);
  }
  getPageId() {
    console.log('change');
    const searchParams = new URL(document.location).searchParams;
    const postIdPage = searchParams.get('id');
    return postIdPage;
  }
}
