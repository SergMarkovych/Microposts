//@ts-check
class UI {
  constructor() {
    this.posts = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.postsContainer = document.querySelector('.postsContainer');
    this.cardForm = document.querySelector('.card-form');
    this.formEnd = document.querySelector('.form-end');
    this.forState = 'add';

    this.alertClass = '.alert';
    this.alertSuccessClass = 'alert alert-success';
  }
  showPosts(posts) {
    let output = '';

    posts.forEach(post => {
      output += `
      <div class="card-mb-3">
        <div class="car-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `;
    });

    this.posts.innerHTML = output;
  }

  fillForm(editedPost) {
    this.idInput.value = editedPost.id;
    this.titleInput.value = editedPost.title;
    this.bodyInput.value = editedPost.body;

    this.changeFormState('edit');
  }

  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      this.cardForm.insertBefore(button, this.formEnd);
    } else {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';

      const postCancel = document.querySelector('.post-cancel');
      if (postCancel) {
        postCancel.remove();
      }
      this.clearIdInput();
      this.clearFields();
    }
  }

  clearIdInput() {
    this.idInput.value = '';
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  showTitleValidation() {
    ui.inputValidation(ui.titleInput)
  }

  showBodyValidation() {
    ui.inputValidation(ui.bodyInput)
  }

  inputValidation(element) {
    const re = /^[a-zA-z0-9\-\.]{10,500}/;
    if (!re.test(element.value)) {
      element.classList.add('is-invalid');
      ui.postSubmit.classList.add('disabled');
    } else {
      element.classList.remove('is-invalid');
      ui.postSubmit.classList.remove('disabled');
    }
  }

  showAlert(message, className) {
    this.clearAlert();

    const div = document.createElement('div');
    div.className = className;
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.right = '0';

    div.appendChild(document.createTextNode(message))

    this.postsContainer.insertBefore(div, this.posts);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(this.alertClass);
    if (currentAlert) {
      currentAlert.remove();
    }
  }
}

export const ui = new UI();