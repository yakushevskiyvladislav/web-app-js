A1
function isValidDateYMD(s) {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  return regex.test(s);
}

console.log(isValidDateYMD("2026-02-18")); 
console.log(isValidDateYMD("18.02.2026")); 
console.log(isValidDateYMD(""));

A2
function isValidTitle(s) {
  const forbiddenCharsRegex = /[<>{};]/;
  return !forbiddenCharsRegex.test(s);
}
console.log(isValidTitle("Обычный заголовок без запрещённых символов"));
console.log(isValidTitle("Заголовок с запрещённым символом <")); 
console.log(isValidTitle("Заголовок с точкой с запятой;")); 

B1
function extractIds(text) {
  const matches = text.match(/\d+/g);
 
  if (!matches) {
    return [];
  }
 
  return matches.map(Number);
}

const testString = "id=5; id=12; id=30";
const result = extractIds(testString);

console.log(result);

B2
function normalizeSpaces(s) {
  const replacedSpaces = s.replace(/\s+/g, ' ');
  return replacedSpaces.trim();
}

const testString = " A B\t\tC ";
const result = normalizeSpaces(testString);

console.log(result); 

C1

function validateRequired(value, fieldName) {
  if (value.trim() === '') {
    return `Поле ${fieldName} обязательно`;
  }
  return null;
}

console.log(validateRequired('', 'Имя')); 
console.log(validateRequired(' ok ', 'Описание')); 

C2
function validateNumberRange(n, min, max, fieldName) {
  if (typeof n !== 'number' || isNaN(n)) {
    return `Поле "${fieldName}" должно быть числом.`;
  }
  if (n < min || n > max) {
    return `Значение поля "${fieldName}" должно быть в диапазоне от ${min} до ${max}.`;
  }
  return null;
}
const min = 0;
const max = 10;
const fieldName = "number";

console.log(validateNumberRange(10, min, max, fieldName)); 
console.log(validateNumberRange(-1, min, max, fieldName)); 
console.log(validateNumberRange(NaN, min, max, fieldName));

D1
function normalizeSpaces(s) {
  const replacedSpaces = s.replace(/\s+/g, ' ');
  return replacedSpaces.trim();
}

function buildRecordFromForm(raw) {
  const normalizedTitle = normalizeSpaces(raw.title);
 
     const numericValue = Number(raw.value);
 
     return {
    title: normalizedTitle,
    value: numericValue,
    status: raw.status,
    createdAt: raw.createdAt
  };
}

const rawInput1 = {
  title: "      Отзыв         с   пробелами      ",
  value: "5",
  status: "new",
  createdAt: "2026-03-24"
};

const rawInput2 = {
  title: 'Без пробелов',
  value: "5",
  status: "old",
  createdAt: "2026-02-01"
};

const record1 = buildRecordFromForm(rawInput1);
const record2 = buildRecordFromForm(rawInput2);

console.log("Исходная строка 1:", rawInput1);
console.log("Результат обработки строки 1:", record1);
console.log("\nИсходная строка 2:", rawInput2);
console.log("Результат обработки строки 2:", record2);


function isValidTitle(title) {
  return typeof title === 'string' && title.length > 0 && title.length <= 100;
}
function isValidValue(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}
function isValidStatus(status) {
  const validStatuses = ['active', 'inactive'];
  return validStatuses.includes(status);
}
function isValidDate(dateString) {
  if (typeof dateString !== 'string') return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === date.toISOString();
}
function collectErrors(record) {
  const errors = [];

  if (!isValidTitle(record.title)) {
    errors.push('title должен быть непустой строкой длиной до 100 символов');
  }

  if (!isValidValue(record.value)) {
    errors.push('value должен быть корректным числом');
  }

  if (!isValidStatus(record.status)) {
    errors.push(`status должен быть одним из: active, inactive`);
  }

  if (!isValidDate(record.createdAt)) {
    errors.push('createdAt должен быть датой в формате ISO');
  }

  return errors;
}
const validRecord = {
  title: 'Корректный заголовок',
  value: 42,
  status: 'active',
  createdAt: '2026-01-01T12:30:00.000Z'
};

console.log('1 — валидный объект:');
console.log('Входные данные:', validRecord);
console.log('Ошибки:', collectErrors(validRecord));
console.log('---');

const invalidRecord = {
  title: '',
  value: NaN,
  status: 'unknown',
  createdAt: 'не дата'
};
console.log('2 — объект с ошибками:');
console.log('Входные данные:', invalidRecord);
console.log('Ошибки:', collectErrors(invalidRecord));

D2
function isValidTitle(title) {
  return typeof title === 'string' && title.length > 0 && title.length <= 100;
}
function isValidValue(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}
function isValidStatus(status) {
  const validStatuses = ['active', 'inactive'];
  return validStatuses.includes(status);
}
function isValidDate(dateString) {
  if (typeof dateString !== 'string') return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === date.toISOString();
}
function collectErrors(record) {
  const errors = [];

  if (!isValidTitle(record.title)) {
    errors.push('title должен быть непустой строкой длиной до 100 символов');
  }

  if (!isValidValue(record.value)) {
    errors.push('value должен быть корректным числом');
  }

  if (!isValidStatus(record.status)) {
    errors.push(`status должен быть одним из: active, inactive`);
  }

  if (!isValidDate(record.createdAt)) {
    errors.push('createdAt должен быть датой в формате ISO');
  }

  return errors;
}
const validRecord = {
  title: 'Корректный заголовок',
  value: 42,
  status: 'active',
  createdAt: '2026-01-01T12:30:00.000Z'
};

console.log('1 — валидный объект:');
console.log('Входные данные:', validRecord);
console.log('Ошибки:', collectErrors(validRecord));
console.log('---');

const invalidRecord = {
  title: '',
  value: NaN,
  status: 'unknown',
  createdAt: 'не дата'
};
console.log('2 — объект с ошибками:');
console.log('Входные данные:', invalidRecord);
console.log('Ошибки:', collectErrors(invalidRecord));

E1

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function demonstrateDelay() {
  console.log("Начало выполнения, ждём 500 мс...");
 
await delay(500);
  console.log("done");
}
demonstrateDelay();

E1

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function demonstrateDelay() {
  console.log("Начало выполнения, ждём 500 мс...");
 
await delay(500);
  console.log("done");
}
demonstrateDelay();

E2
async function safeFetchJson(url) {
  let resp;
  try {
    resp = await fetch(url);
  } catch (err) {
    return {
      ok: false,
      error: "Сетевая ошибка",
      details: String(err)
    };
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
    return {
      ok: false,
      error: "Ошибка JSON",
      details: String(err)
    };
  }

  return {
    ok: true,
    data
  };
}
async function demonstrateSafeFetch() {
  console.log('=== Демонстрация safeFetchJson ===\n');
  
  console.log('1. Успешный запрос:');
  const successUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  const successResult = await safeFetchJson(successUrl);
  console.log(successResult);
  console.log('---');

  console.log('2. Некорректный URL (сетевая ошибка):');
  const invalidUrl = 'https://none-domain-1234.com/api/data';
  const networkErrorResult = await safeFetchJson(invalidUrl);
  console.log(networkErrorResult);
  console.log('---');

  console.log('3. HTTP ошибка 404:');
  const notFoundUrl = 'https://jsonplaceholder.typicode.com/nonexistent-endpoint';
  const httpErrorResult = await safeFetchJson(notFoundUrl);
  console.log(httpErrorResult);
}
demonstrateSafeFetch();

F1
function tryParseJson(text) {
  try {
    const data = JSON.parse(text);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: error.message
    };
  }
}
const validJson = '{"a":1}';
console.log('1. Корректный JSON:');
console.log('Входные данные:', validJson);
console.log('Результат:', tryParseJson(validJson));
console.log('---');

const invalidJson = '{a:1}';
console.log('2. Некорректный JSON:');
console.log('Входные данные:', invalidJson);
console.log('Результат:', tryParseJson(invalidJson));


F1
function tryParseJson(text) {
  try {
    const data = JSON.parse(text);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: error.message
    };
  }
}
const validJson = '{"a":1}';
console.log('1. Корректный JSON:');
console.log('Входные данные:', validJson);
console.log('Результат:', tryParseJson(validJson));
console.log('---');

const invalidJson = '{a:1}';
console.log('2. Некорректный JSON:');
console.log('Входные данные:', invalidJson);
console.log('Результат:', tryParseJson(invalidJson));



F2
function normalizeApiValue(x) {
  if (typeof x === 'number') {
    return isNaN(x) ? 0 : x;
  }
  if (typeof x === 'string') { 
    const num = Number(x);
    return isNaN(num) ? 0 : num;
  }
  
  return 0;
}
const testValues = [10, "20", null, "abc"];

testValues.forEach(value => {
  const result = normalizeApiValue(value);
  console.log(`normalizeApiValue(${JSON.stringify(value)}) → ${result}`);
});
