A1
function calcTotal(a, b) {
  const sum = a + b;
  console.log(sum);
  return sum;
}
calcTotal(10, 5);

A2
function formatRecord(id, title, status) {
  return `#${id} ${title} [${status}]`;
}
console.log(formatRecord(3, "Тестовая запись", "new"));

B1
const values = [1200, 500, 800, 1500];
let sum = 0;
for(let i = 0; i<values.length; i++){
    sum+= values[i];
}
console.log(sum);

B2.
const values = [1200, 500, 800, 1500];

const filteredValues = values.filter(value => value >= 800);
console.log(filteredValues);

C1 
const record = {
  id: 1,
  title: "Отзыв",
  value: 5,
  status: "new",
  createdAt: "2026-03-10"
};
console.log("До:", record);

record.status = "old";

console.log("После status:", record);

C2
function isNew(record) {
  return record.status === "new";
}

const record1 = {
  id: 1,
  title: ‘Хорошее !’,
  value: 5,
  status: "new",
  createdAt: "2026-03-01"
};

const record2 = {
  id: 2,
  title: ‘Плоховато!’,
  value: 1,
  status: "old",
  createdAt: ‘2026-03-10’
};
console.log("record1 (status: 'new'):", isNew(record1));
console.log("record2 (status: 'new'):", isNew(record2));

