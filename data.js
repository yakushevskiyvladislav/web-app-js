const reviews = [
  { id: 1, text: 'Отличное место!', value: 5, status: "new", createdAt: "2026-03-15" },
  { id: 2, text: "Среднее качество обслуживания", value: 3, status: "new", createdAt: "2026-03-16"},
  { id: 3, text: "Всё понравилось", value: 5, status: "old", createdAt: "2026-02-15"},
  { id: 4, text: "Неплохо, но можно лучше", value: 4, status: "new", createdAt: "2026-03-20"},
  { id: 5, text: "Ужасное обслуживание", value: 1, status: "old", createdAt: "2026-01-15" },
  { id: 6, text: "Плоховато", value: 2, status: "new", createdAt: '2026-03-15'},
  { id: 7, text: "Хорошее заведение", value: 4, status: "new", createdAt: "2026-03-15"},
  { id: 8, text: "Рекомендую", value: 5, status: "new", createdAt: "2026-03-17"},
  { id: 9, text: "Отвратительное обслуживание", value: 2, status: "new", createdAt: "2026-03-14"}
];

let nextId = reviews.length + 1;
window.reviews = reviews;
window.nextId = nextId;
