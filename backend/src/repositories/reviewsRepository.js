const db = require('../database/sqlite');
const Review = require('../models/reviewModel');

module.exports = {
    async findByBookId(bookId) {
        const sql = `
            SELECT r.id, r.rating, r.comment, r.created_at, r.updated_at, u.id AS user_id, u.username
            FROM reviews r
                     JOIN users u ON r.user_id = u.id
            WHERE r.book_id = ?
            ORDER BY r.created_at DESC
        `;
        const rows = await db.all(sql, [bookId]);
        return rows.map(row => new Review({ ...row, username: row.username }));
    },

    async findById(id) {
        const sql = `SELECT * FROM reviews WHERE id = ? LIMIT 1`;
        const row = await db.get(sql, [id]);
        return row ? new Review(row) : null;
    },

    async create({ userId, bookId, rating, comment }) {
        const sql = `
      INSERT INTO reviews (user_id, book_id, rating, comment, created_at, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;
        const result = await db.run(sql, [userId, bookId, rating, comment || null]);
        const id = result && (result.lastID || result.last_id || result.insertId) ? (result.lastID || result.last_id || result.insertId) : null;
        return this.findById(id);
    }
};