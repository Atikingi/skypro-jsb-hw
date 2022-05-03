function getPath() {
  let searchDiv = document.querySelector('.iknowwhereyoulive');
  const textPath = document.querySelector('.path');
  searchDiv.onclick = function () {
    const tags = [];

    while (searchDiv.parentElement !== null) {
      tags.push(searchDiv.nodeName);
      searchDiv = searchDiv.parentElement;
    }

    tags.push('HTML');
    searchDiv = document.querySelector('.iknowwhereyoulive');

    return (textPath.textContent = tags.reverse().join(' > ').toLowerCase());
  };
}

getPath();
