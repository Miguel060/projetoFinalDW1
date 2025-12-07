class Favorite {
  constructor({ user_id, book_id, created_at }) {
    this.userId = user_id ?? null;
    this.bookId = book_id ?? null;
    this.createdAt = created_at ?? null;
  }
}

module.exports = Favorite;
