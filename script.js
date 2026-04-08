//Лабораторная работа N2
Задание 2.1
const appConfig = {
appTitle: 'Система учёта отзывов',
defaultStatus: 'new',
minValueForFilter: 800
};
let actionCount = 0;
actionCount += 1;
actionCount++;
actionCount = actionCount + 1;
appConfig.minValueForFilter = 1000;
console.log(actionCount); 
console.log(appConfig);

Задание 2.2
const task1 = {
  id: 1,
  title: 'пользователь',
  value: 'text',
  status: 'new',
  createdAt: '2026-02-10'
};
const task2 = {
  id: 2,
  title: 'обьект отзыва',
  value: 'text',
  status: 'new',
  createdAt: '2026-02-12'
};
const task3 = {
  id: 3,
  title: 'отзыв',
  value: 'text',
  status: 'new',
  createdAt: '2026-02-14'
};
const task4 = {
  id: 4,
  title: 'комментарий',
  value: 'text',
  status: 'new',
  createdAt: '2026-02-15'
};
const task5 = {
  id: 5,
  title: 'модерация',
  value: 'text',
  status: 'proccess',
  createdAt: '2026-02-16'
};
const task6 = {
  id: 6,
  title: 'статистика',
  value: 'text',
  status: 'completed',
  createdAt: '2026-02-17'
};
console.log(task1,task2,task3,task4,task5,task6)



Задание 2.3
const inputMinValue = "800";

const minValue = Number(inputMinValue);
if (Number.isNaN(minValue)) {
  console.log("Ошибка: введённое значение не является числом.");
} else {
  console.log(minValue);
}

Задание 2.4
const userAge = 19;
const isBlocked = false;
const hasAccess = userAge >= 18 && userAge < 65 && !isBlocked;
console.log(hasAccess);

Задание 2.5
const task = {
  id: 1,
  title: 'Пользователь',
  value: 1200,
  status: 'new',
  createdAt: '2026-02-10'
};
let statusDescription;
switch (task.status) {
  case 'new':
    statusDescription = 'Новая запись';
    break;
  case 'done':
    statusDescription = 'Завершено';
    break;
  default:
    statusDescription = 'Неизвестный статус';
    break;
}
let valueCategory;
if (task.value >= 1000) {
  valueCategory = 'Высокое значение';
} else if (task.value >= 700) {
  valueCategory = 'Среднее значение';
} else {
  valueCategory = 'Низкое значение';
}
console.log('Статус:', statusDescription);
console.log('Категория по значению:', valueCategory);

Задание 2.6
const entities = [
  { id: 1, status: "new" },
  { id: 2, status: "processed" },
  { id: 3, status: "new" },
  { id: 4, status: "completed" },
  { id: 5, status: "new" }
];
let newCount = 0;
let i = 0;

while (i < entities.length) {
  if (entities[i].status === "new") {
    newCount++;
  }
  i++; 
}
console.log(`Количество сущностей со статусом "new": ${newCount}`);

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
