// Model simples para normalizar objetos de review
class Review {
    constructor({ id, user_id, userId, book_id, bookId, rating, comment, created_at, updated_at }) {
        this.id = id ?? null;
        this.userId = user_id ?? userId ?? null;
        this.bookId = book_id ?? bookId ?? null;
        this.rating = rating ?? null;
        this.comment = comment ?? null;
        this.createdAt = created_at ?? null;
        this.updatedAt = updated_at ?? null;
    }
}

module.exports = Review;