const listContainer = document.getElementById('list');
const messageContainer = document.getElementById('message');

document.getElementById('btnAll').addEventListener('click', () => {
    renderList(getAllReviews());
    showMessage('Отображены все отзывы');
});

document.getElementById('btnNew').addEventListener('click', () => {
    renderList(getNewReviews());
    showMessage('Отображены только новые отзывы');
});

document.getElementById('btnSort').addEventListener('click', () => {
    renderList(sortByValueDescending(getAllReviews()));
    showMessage('Список отсортирован по рейтингу (по убыванию)');
});

document.getElementById('btnStats').addEventListener('click', () => {
    const stats = getStatistics();
    const message = `Статистика отзывов:
Всего отзывов: ${stats.totalCount}
Сумма рейтингов: ${stats.sumValue}
Максимальный рейтинг: ${stats.maxValue}
Количество новых отзывов: ${stats.newCount}`;
    showMessage(message);
});

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
            if (deleteReview(id)) {
                renderList(getAllReviews());
                showMessage(`Отзыв с ID ${id} удалён`);
            }
        });
    });
}

function showMessage(text) {
    messageContainer.textContent = text;
}

document.addEventListener('DOMContentLoaded', () => {
    renderList(getAllReviews());
});
