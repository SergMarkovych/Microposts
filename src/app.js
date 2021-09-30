import {
  http
} from './http';

import {
  ui
} from './ui';

import {
  settings
} from './settings';

document.addEventListener('DOMContentLoaded', getPosts);

ui.titleInput.addEventListener('blur', ui.showTitleValidation)
ui.bodyInput.addEventListener('blur', ui.showBodyValidation)

ui.postSubmit.addEventListener('click', submitPost);
ui.posts.addEventListener('click', deletePost);
ui.posts.addEventListener('click', editPost);
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function submitPost() {
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;

  if (title === '') {
    ui.showTitleValidation();
  }
  if (body === '') {
    ui.showBodyValidation();
  }
  // Consider adding a notice about empty fields
  if (title !== '' && body !== '') {
    const data = {
      title,
      body
    }

    if (ui.idInput.value === '') {
      http.post(settings.url, data)
        .then(response => {
          ui.showAlert('Post added', ui.alertSuccessClass);
          ui.clearFields();
          getPosts()
        })
        .catch(err => console.log(err));
    } else {
      http.put(`${settings.url}\\${ui.idInput.value}`, data)
        .then(response => {
          ui.showAlert('Post edited', ui.alertSuccessClass);
          ui.clearFields();
          getPosts()
        })
        .catch(err => console.log(err));
      ui.changeFormState('add');
    }
  }
}

function getPosts() {
  return http.get(settings.url)
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}

function editPost(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }

    ui.fillForm(data);
  }

  e.preventDefault();
}

function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    http.delete(`${settings.url}/${e.target.parentElement.dataset.id}`)
      .then(response => {
        ui.showAlert('Post Deleted', ui.alertSuccessClass);
        getPosts();
      })
      .catch(err => console.log(err));
  }

  e.preventDefault();
}

function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}