import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALESTORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', submitForm);
form.addEventListener(
  'input',
  throttle(() => {
    localStorage.setItem(LOCALESTORAGE_KEY, JSON.stringify(getText()));
  }, 500)
);
updateText();

function getText() {
  const user = {};
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  if (email !== '' || message !== '') {
    user.email = email;
    user.message = message;
    return user;
  }
}

function updateText() {
  const storage = localStorage.getItem(LOCALESTORAGE_KEY);
  if (storage !== null) {
    const storageText = JSON.parse(storage);
    form.elements.email.value = storageText.email;
    form.elements.message.value = storageText.message;
  }
}

function submitForm(event) {
  event.preventDefault();
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  if (email !== '' && message !== '') {
    console.log(getText());
    form.reset();
    localStorage.removeItem(LOCALESTORAGE_KEY);
  }
}
