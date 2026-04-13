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
async function loadExternalData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const externalData = await response.json();
        externalData.forEach(item => {
            addReview(
                item.title.substring(0, 50),
                Math.floor(Math.random() * 5) + 1,
                ['new', 'old'][Math.floor(Math.random() * 2)],
                new Date().toISOString().split('T')[0]
            );
        });

        return { success: true, count: externalData.length };
    } catch (error) {
        console.error('Ошибка загрузки внешних данных:', error);
        return {
            success: false,
            error: 'Не удалось загрузить данные из внешнего сервиса. Проверьте подключение к сети.'
        };
    }
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
    const maxValue = Math.max(...window.reviews.map(review => review.value));
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
