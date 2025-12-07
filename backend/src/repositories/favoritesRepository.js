const db = require('../database/sqlite');
const Favorite = require('../models/favoriteModel');

module.exports = {
    async findByUserId(userId) {
        const sql = `
            SELECT b.*, f.created_at as favorited_at
            FROM favorites f
                     JOIN livros b ON f.book_id = b.id
            WHERE f.user_id = ?
            ORDER BY f.created_at DESC
        `;
        const rows = await db.all(sql, [userId]);
        return rows; // return raw book rows (Book model optional)
    },

    async add(userId, bookId) {
        const sql = `INSERT OR IGNORE INTO favorites (user_id, book_id, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)`;
        return db.run(sql, [userId, bookId]);
    },

    async remove(userId, bookId) {
        const sql = `DELETE FROM favorites WHERE user_id = ? AND book_id = ?`;
        return db.run(sql, [userId, bookId]);
    },

    async isFavorited(userId, bookId) {
        const sql = `SELECT 1 FROM favorites WHERE user_id = ? AND book_id = ? LIMIT 1`;
        const row = await db.get(sql, [userId, bookId]);
        return !!row;
    }
};