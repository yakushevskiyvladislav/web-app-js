const reviews = [
  { id: 1, text: «Отличное место!", value: 5, status: "new" },
  { id: 2, text: "Среднее качество обслуживания", value: 3, status: "processed" },
  { id: 3, text: "Всё понравилось", value: 5, status: "new" },
  { id: 4, text: "Неплохо, но можно лучше", value: 4, status: "new" },
  { id: 5, text: "Ужасное обслуживание", value: 1, status: "processed" },
  { id: 6, text: "Плоховато", value: 2, status: "new" }
];

const output = document.getElementById('output');
const btnAll = document.getElementById('btnAll');
const btnNew = document.getElementById('btnNew');
const btnStats = document.getElementById('btnStats');

const formatReview = (review) =>
  `ID: ${review.id}, Текст: "${review.text}", Value: ${review.value}, Статус: ${review.status}`;
btnAll.addEventListener('click', () => {
  let result = 'Все записи:\n\n';
  reviews.forEach(review => {
    result += formatReview(review) + '\n';
  });
  output.textContent = result;
});

btnNew.addEventListener('click', () => {
  const newReviews = reviews.filter(review => review.status === 'new');
  let result = 'Записи со статусом "new":\n\n';

  if (newReviews.length === 0) {
    result += 'Записей со статусом "new" не найдено.';
  } else {
    newReviews.forEach(review => {
      result += formatReview(review) + '\n';
    });
  }
  output.textContent = result;
});

btnStats.addEventListener('click', () => {
   const minValueInput = prompt('Введите минимальный порог value для фильтрации:', '1');
  const minValue = Number(minValueInput);

 if (isNaN(minValue)) {
    output.textContent = 'Ошибка: введите корректное число для порога фильтрации.';
    return;
  }
   const totalCount = reviews.length;
  const sumValue = reviews.reduce((sum, review) => sum + review.value, 0);
  const maxValue = Math.max(...reviews.map(review => review.value));
  const newCount = reviews.filter(review => review.status === 'new').length;
  const filteredReviews = reviews.filter(review => review.value >= minValue);

 let result = 'Данные корректны\n';
  result += `Всего записей: ${totalCount}\n`;
  result += `Сумма value: ${sumValue}\n`;
  result += `Максимум value: ${maxValue}\n`;
  result += `Количество status="new": ${newCount}\n`;
  result += `Фильтр value >= ${minValue}:\n`;

  if (filteredReviews.length === 0) {
    result += 'Записей, удовлетворяющих условию, не найдено.';
  } else {
    filteredReviews.forEach(review => {
      result += '  ' + formatReview(review) + '\n';
    });
  }
  output.textContent = result;
});
