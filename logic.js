function validateForm(title, value, createdAt) {
  const errors = [];

  const normalizedTitle = title.trim();
  if (normalizedTitle.length === 0) {
    errors.push("Поле 'Текст отзыва' обязательно для заполнения");
  } else {
    const forbiddenCharsRegex = /[<>{};]/;
    if (forbiddenCharsRegex.test(normalizedTitle)) {
      errors.push("Поле 'Текст отзыва' содержит запрещённые символы: <, >, {, }, ;");
    }
  }

  const numericValue = parseInt(value, 10);
  if (isNaN(numericValue) || numericValue < 0 || numericValue > 1000000) {
    errors.push("Поле 'Рейтинг' должно быть числом от 0 до 1 000 000");
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(createdAt)) {
    errors.push("Дата должна быть в формате YYYY-MM-DD");
  } else {
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) {
      errors.push("Некорректная дата");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    normalizedTitle,
    numericValue
  };
}

function addReview(text, value, status, createdAt) {
  const newReview = {
    id: window.nextId++,
    text: text,
    value: value,
    status: status,
    createdAt: createdAt
  };
  window.reviews.push(newReview);
  return newReview;
}

async function safeFetchJson(url) {
  let resp;
  try {
    resp = await fetch(url);
  } catch (err) {
    return { ok: false, error: "Сетевая ошибка", details: String(err) };
  }

  if (!resp.ok) {
    return {
      ok: false,
      error: `HTTP ошибка: ${resp.status}`,
      details: resp.statusText
    };
  }

  let data;
  try {
    data = await resp.json();
  } catch (err) {
    return { ok: false, error: "Ошибка JSON", details: String(err) };
  }

  return { ok: true, data };
}

async function loadExternalData() {
  const result = await safeFetchJson('https://jsonplaceholder.typicode.com/posts?_limit=3');

  if (!result.ok) {
    console.error('Ошибка загрузки внешних данных:', result.error, result.details);
    return {
      success: false,
      error: 'Не удалось загрузить внешние данные. Проверьте подключение к сети.'
    };
  }

  const externalData = result.data;
  externalData.forEach(item => {
    addReview(
      item.title.substring(0, 50),
      Math.floor(Math.random() * 5) + 1,
      ['new', 'old'][Math.floor(Math.random() * 2)],
      new Date().toISOString().split('T')[0]
    );
  });

  return { success: true, count: externalData.length };
}

window.validateForm = validateForm;
window.addReview = addReview;
window.loadExternalData = loadExternalData;

function getAllReviews() {
  return window.reviews;
}

function getNewReviews() {
  return window.reviews.filter(review => review.status === "new");
}

function sortByValueDescending(reviewsArray) {
  return [...reviewsArray].sort((a, b) => b.value - a.value);
}

function getStatistics() {
  const totalCount = window.reviews.length;
  const sumValue = window.reviews.reduce((sum, review) => sum + review.value, 0);

   const maxValue = totalCount > 0
    ? Math.max(...window.reviews.map(review => review.value))
    : 0;

  const newCount = window.reviews.filter(review => review.status === "new").length;

  return { totalCount, sumValue, maxValue, newCount };
}

function deleteReview(id) {
  const index = window.reviews.findIndex(review => review.id === id);
  if (index !== -1) {
    window.reviews.splice(index, 1);
    return true;
  }
  return false;
}

window.getAllReviews = getAllReviews;
window.getNewReviews = getNewReviews;
window.sortByValueDescending = sortByValueDescending;
window.getStatistics = getStatistics;
window.deleteReview = deleteReview;
