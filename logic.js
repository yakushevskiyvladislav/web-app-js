function getAllReviews() {
    return reviews;
}

function getNewReviews() {
    return reviews.filter(review => review.status === "new");
}

function sortByValueDescending(reviewsArray) {
    return [...reviewsArray].sort((a, b) => b.value - a.value);
}

function getStatistics() {
    const totalCount = reviews.length;
    const sumValue = reviews.reduce((sum, review) => sum + review.value, 0);
    const maxValue = Math.max(...reviews.map(review => review.value));
    const newCount = reviews.filter(review => review.status === "new").length;

    return { totalCount, sumValue, maxValue, newCount };
}

function deleteReview(id) {
    const index = reviews.findIndex(review => review.id === id);
    if (index !== -1) {
        reviews.splice(index, 1);
        return true;
    }
    return false;
}

