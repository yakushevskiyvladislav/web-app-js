document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('list');
    const messageContainer = document.getElementById('message');
    const formErrors = document.getElementById('formErrors');
    const recordForm = document.getElementById('recordForm');

    if (!listContainer || !messageContainer || !formErrors || !recordForm) {
        console.error('Не найдены необходимые элементы DOM');
        return;
    }
    function renderList(reviewsArray) {
        listContainer.innerHTML = '';

        reviewsArray.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <h3>${review.text}</h3>
                <p>Рейтинг: ${review.value}</p>
                <p>Статус: ${review.status}</p>
                <p>Дата создания: ${review.createdAt}</p>
                <button class="delete-btn" data-id="${review.id}">Удалить</button>
            `;
            listContainer.appendChild(card);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = Number(e.target.dataset.id);
                if (window.deleteReview(id)) {
                    renderList(window.getAllReviews());
                    showMessage(`Отзыв с ID ${id} удалён`);
                }
            });
        });
    }
function showMessage(text) {
    messageContainer.textContent = text;
}
function clearFormErrors() {
    formErrors.innerHTML = '';
}
recordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFormErrors();

    const title = document.getElementById('titleInput').value;
    const value = document.getElementById('valueInput').value;
    const createdAt = document.getElementById('createdAtInput').value;
    const status = document.getElementById('statusInput').value;

    const validationResult = window.validateForm(title, value, createdAt);

    if (!validationResult.isValid) {
        formErrors.innerHTML = validationResult.errors.map(error =>
            `<p style="color: red; margin: 5px 0;">${error}</p>`
        ).join('');
        showMessage('Исправьте ошибки формы');
        return;
    }
    window.addReview(
        validationResult.normalizedTitle,
        validationResult.numericValue,
        status,
        createdAt
    );
    recordForm.reset();
    renderList(window.getAllReviews());
    showMessage('Отзыв успешно добавлен!');
});
document.getElementById('loadExternalData').addEventListener('click', async () => {
    const result = await window.loadExternalData();

    if (result.success) {
        renderList(window.getAllReviews());
        showMessage(`Успешно загружено ${result.count} записей из внешнего сервиса`);
    } else {
        showMessage(result.error);
    }
});
document.getElementById('btnAll').addEventListener('click', () => {
    renderList(window.getAllReviews());
    showMessage('Отображены все отзывы');
});

document.getElementById('btnNew').addEventListener('click', () => {
    renderList(window.getNewReviews());
    showMessage('Отображены только новые отзывы');
});

document.getElementById('btnSort').addEventListener('click', () => {
    renderList(window.sortByValueDescending(window.getAllReviews()));
    showMessage('Список отсортирован по рейтингу (по убыванию)');
});

document.getElementById('btnStats').addEventListener('click', () => {
    const stats = window.getStatistics();
    const message = `Статистика отзывов:
Всего отзывов: ${stats.totalCount}
Сумма рейтингов: ${stats.sumValue}
Максимальный рейтинг: ${stats.maxValue}
Количество новых отзывов: ${stats.newCount}`;
    showMessage(message);
});
renderList(window.getAllReviews());
});
