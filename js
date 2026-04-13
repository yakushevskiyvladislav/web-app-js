// ========== ФУНКЦИЯ БЕЗОПАСНОЙ ЗАГРУЗКИ ==========
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
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `
        <strong>${title}</strong>: ${message}
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// ========== ЗАГРУЗКА ДАННЫХ С СЕРВЕРА ==========
async function loadDataFromServer() {
    const result = await safeFetchJson('/api/processes');
    
    if (result.ok) {
        processes = result.data;
        renderAll();
    } else {
        showNotification('Ошибка', `Не удалось загрузить данные: ${result.error}`);
    }
}

// ========== СОХРАНЕНИЕ НА СЕРВЕР ==========
async function saveDataToServer() {
    try {
        const response = await fetch('/api/processes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(processes)
        });

        if (!response.ok) {
            throw new Error(`Ошибка сохранения: ${response.statusText}`);
        }

        showNotification('Успех', 'Данные успешно сохранены');
    } catch (error) {
        showNotification('Ошибка', `Не удалось сохранить данные: ${error.message}`);
    }
}
// ========== ИЗМЕНЕНИЯ В СОХРАНЕНИИ ==========
function saveToStorage() {
    localStorage.setItem('priorityMatrix', JSON.stringify(processes));
    saveDataToServer();
}
// ========== ДАННЫЕ ==========

const initialProcesses = [
  {
    id: 1,
    name: "Приём и обработка заявки",
    type: "Основной",
    cycleTime: 2, cost: 3, automation: 2, rework: 4,
    strategicValue: 5, criticality: 4, innovation: 5, techDebt: 2
  },
  {
    id: 2,
    name: "Планирование маршрутов",
    type: "Основной",
    cycleTime: 1, cost: 2, automation: 1, rework: 5,
    strategicValue: 5, criticality: 5, innovation: 5, techDebt: 1
  },
  {
    id: 3,
    name: "Исполнение рейса",
    type: "Основной",
    cycleTime: 3, cost: 3, automation: 2, rework: 3,
    strategicValue: 4, criticality: 5, innovation: 4, techDebt: 2
  },
  {
    id: 4,
    name: "Расчёт стоимости и счета",
    type: "Поддерживающий",
    cycleTime: 2, cost: 2, automation: 2, rework: 4,
    strategicValue: 3, criticality: 4, innovation: 3, techDebt: 2
  },
  {
    id: 5,
    name: "Управление парком (ТО)",
    type: "Поддерживающий",
    cycleTime: 4, cost: 4, automation: 3, rework: 2,
    strategicValue: 3, criticality: 4, innovation: 3, techDebt: 3
  },
  {
    id: 6,
    name: "Работа с претензиями",
    type: "Управленческий",
    cycleTime: 1, cost: 2, automation: 1, rework: 5,
    strategicValue: 4, criticality: 3, innovation: 4, techDebt: 1
  }
];

// Рабочая копия массива (с ней будем работать)
let processes = [...initialProcesses];
// ========== РАСЧЁТЫ ==========

function calcOperational(process) {
  return (process.cycleTime + process.cost
        + process.automation + process.rework) / 4;
}

function calcStrategic(process) {
  return (process.strategicValue + process.criticality
        + process.innovation + process.techDebt) / 4;
}

function getZone(process) {
  const op = calcOperational(process);
  const st = calcStrategic(process);

  if (op < 3 && st >= 3) return 1; // Срочные изменения
  if (op >= 3 && st >= 3) return 2; // Развитие
  if (op < 3 && st < 3)  return 3; // Стандартизация
  return 4;                         // Мониторинг
}
// ========== РЕНДЕРИНГ ==========

function renderTable() {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';  
  

 getFilteredProcesses().forEach(function(process){
    const op = calcOperational(process).toFixed(2);
    const st = calcStrategic(process).toFixed(2);
    const zone = getZone(process);


    const row = document.createElement('tr');
    row.innerHTML =
      '<td>' + process.name + '</td>' +
      '<td>' + process.type + '</td>' +
      '<td>' + op + '</td>' +
      '<td>' + st + '</td>' +
      '<td>Зона ' + zone + '</td>' +
      '<td><button class="btn-delete" data-id="' + process.id + '">Удалить</button></td>';

    tbody.appendChild(row);
  });
}
function renderMatrix() {
  // Очищаем все зоны (оставляем только заголовки)
  for (var i = 1; i <= 4; i++) {
    var zoneEl = document.getElementById('zone-' + i);
    // Удаляем все карточки, но оставляем <h3>
    var chips = zoneEl.querySelectorAll('.process-chip');
    chips.forEach(function(chip) { chip.remove(); });
  }

  // Распределяем процессы по зонам
 getFilteredProcesses().forEach(function(process){
    var zone = getZone(process);
    var zoneEl = document.getElementById('zone-' + zone);

    var chip = document.createElement('div');
    chip.className = 'process-chip';
    chip.textContent = process.name;
    zoneEl.appendChild(chip);
  });
  // Внутри renderMatrix(), после распределения процессов:
for (var i = 1; i <= 4; i++) {
  var zoneEl = document.getElementById('zone-' + i);
  var count = zoneEl.querySelectorAll('.process-chip').length;
  var h3 = zoneEl.querySelector('h3');

  // Названия зон
  var zoneNames = {
    1: 'Срочные изменения',
    2: 'Развитие',
    3: 'Стандартизация',
    4: 'Мониторинг'
  };

  h3.textContent = zoneNames[i] + ' (' + count + ')';
}
}
function renderAll() {
  renderTable();
  renderMatrix();
  saveToStorage(); // Сохраняем после каждой перерисовки
}
function getFilteredProcesses() {
  if (activeFilter === 'all') return processes;
  return processes.filter(function(p) {
    return getZone(p) === Number(activeFilter);
  });
}
// ========== ДОБАВЛЕНИЕ ПРОЦЕССА ==========

function handleAddProcess(event) {
  event.preventDefault(); // Предотвращаем перезагрузку страницы

  // Генерируем уникальный id
  var maxId = 0;
  processes.forEach(function(p) {
    if (p.id > maxId) maxId = p.id;
  });
  var newId = maxId + 1;

  // Собираем данные из формы
  var newProcess = {
    id: newId,
    name: document.getElementById('inp-name').value,
    type: document.getElementById('inp-type').value,
    cycleTime:       Number(document.getElementById('inp-cycleTime').value),
    cost:            Number(document.getElementById('inp-cost').value),
    automation:      Number(document.getElementById('inp-automation').value),
    rework:          Number(document.getElementById('inp-rework').value),
    strategicValue:  Number(document.getElementById('inp-strategicValue').value),
    criticality:     Number(document.getElementById('inp-criticality').value),
    innovation:      Number(document.getElementById('inp-innovation').value),
    techDebt:        Number(document.getElementById('inp-techDebt').value)
  };

  // Добавляем в массив
  processes.push(newProcess);

  // Обновляем отображение
  renderAll();

  // Очищаем форму
  event.target.reset();
}

// ========== УДАЛЕНИЕ ПРОЦЕССА ==========

function handleDelete(event) {
  // Проверяем, что клик был именно по кнопке удаления
  if (event.target.classList.contains('btn-delete')) {
    var id = Number(event.target.getAttribute('data-id'));

    // Удаляем процесс из массива
    processes = processes.filter(function(p) {
      return p.id !== id;
    });

    renderAll();
  }
}
// ========== СОРТИРОВКА ==========

var currentSort = { field: null, ascending: true };

function sortProcesses(field) {
  // Если кликнули по тому же столбцу — меняем направление
  if (currentSort.field === field) {
    currentSort.ascending = !currentSort.ascending;
  } else {
    currentSort.field = field;
    currentSort.ascending = true;
  }

  processes.sort(function(a, b) {
    var valA, valB;

    if (field === 'name' || field === 'type') {
      valA = a[field];
      valB = b[field];
      if (valA < valB) return currentSort.ascending ? -1 : 1;
      if (valA > valB) return currentSort.ascending ? 1 : -1;
      return 0;
    }

    if (field === 'operational') {
      valA = calcOperational(a);
      valB = calcOperational(b);
    } else if (field === 'strategic') {
      valA = calcStrategic(a);
      valB = calcStrategic(b);
    } else if (field === 'zone') {
      valA = getZone(a);
      valB = getZone(b);
    }

    return currentSort.ascending ? valA - valB : valB - valA;
  });

  renderAll();
}
// ========== ФИЛЬТРАЦИЯ ==========

var activeFilter = 'all';

function filterByZone(zoneValue) {
  activeFilter = zoneValue;
  renderAll();
}
// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', function() {
  // Загружаем сохранённые данные (если есть)
  loadFromStorage();

  // Подключаем обработчики
  document.getElementById('process-form')
    .addEventListener('submit', handleAddProcess);
  document.getElementById('table-body')
    .addEventListener('click', handleDelete);

  // Первичная отрисовка
  renderAll();
});
function resetData() {
  if (confirm('Вернуть начальные данные? Все изменения будут потеряны.')) {
    processes = initialProcesses.map(function(p) {
      // Создаём глубокую копию каждого объекта
      return Object.assign({}, p);
    });
    renderAll();
  }
}







// ========== ХРАНЕНИЕ ==========

function saveToStorage() {
  var data = JSON.stringify(processes);
  localStorage.setItem('priorityMatrix', data);
}

function loadFromStorage() {
  var data = localStorage.getItem('priorityMatrix');
  if (data) {
    processes = JSON.parse(data);
  }
}


// ========== ЭКСПОРТ ==========

function exportJSON() {
  // Формируем данные с рассчитанными полями
  var exportData = processes.map(function(p) {
    return {
      name: p.name,
      type: p.type,
      operationalAvg: calcOperational(p).toFixed(2),
      strategicAvg: calcStrategic(p).toFixed(2),
      zone: getZone(p),
      criteria: {
        cycleTime: p.cycleTime,
        cost: p.cost,
        automation: p.automation,
        rework: p.rework,
        strategicValue: p.strategicValue,
        criticality: p.criticality,
        innovation: p.innovation,
        techDebt: p.techDebt
      }
    };
  });

  // Создаём файл для скачивания
  var json = JSON.stringify(exportData, null, 2);
  var blob = new Blob([json], { type: 'application/json' });
  var url = URL.createObjectURL(blob);

  var link = document.createElement('a');
  link.href = url;
  link.download = 'priority-matrix.json';
  link.click();

  URL.revokeObjectURL(url);
}
