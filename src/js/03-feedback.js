import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

// Функція для збереження даних в локальному сховищі
function saveDataToLocalStorage() {
  const email = feedbackForm.email.value;
  const message = feedbackForm.message.value;
  
  // Зберігаємо дані у локальному сховищі
  localStorage.setItem('feedback-form-state', JSON.stringify({ email, message }));
}

// Застосовуємо затримку не частіше, ніж раз на 500 мс
const throttledSaveDataToLocalStorage = throttle(saveDataToLocalStorage, 500);

// Перевіряємо стан локального сховища при завантаженні сторінки
const savedData = localStorage.getItem('feedback-form-state');

if (savedData) {
  const formData = JSON.parse(savedData);
  feedbackForm.email.value = formData.email;
  feedbackForm.message.value = formData.message;
}

// Встановлюємо обробник події "submit" на формі
feedbackForm.addEventListener('submit', handleSubmit);

// Функція для обробки події "submit"
function handleSubmit(event) {
  event.preventDefault();
  
  // Виводимо об'єкт з полями email та message у консоль
  const email = feedbackForm.email.value;
  const message = feedbackForm.message.value;
  console.log({ email, message });

  // Очищаємо локальне сховище
  localStorage.removeItem('feedback-form-state');

  // Очищаємо поля форми
  feedbackForm.email.value = '';
  feedbackForm.message.value = '';
}

// Додаємо обробники подій "input" на поля форми для виклику затриманої функції
feedbackForm.email.addEventListener('input', throttledSaveDataToLocalStorage);
feedbackForm.message.addEventListener('input', throttledSaveDataToLocalStorage);


