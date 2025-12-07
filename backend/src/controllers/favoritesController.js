const favoritesRepo = require('../repositories/favoritesRepository');

module.exports = {
    async list(req, res, next) {
        try {
            const userId = req.user?.id || req.query.userId;
            if (!userId) return res.status(400).json({ error: 'userId faltando' });
            const books = await favoritesRepo.findByUserId(userId);
            res.json(books);
        } catch (err) {
            next(err);
        }
    },

    async add(req, res, next) {
        try {
            const userId = req.user?.id || req.body.userId;
            const { bookId } = req.body;
            if (!userId || !bookId) return res.status(400).json({ error: 'Dados incompletos' });
            await favoritesRepo.add(userId, bookId);
            res.status(201).json({ ok: true });
        } catch (err) {
            next(err);
        }
    },

    async remove(req, res, next) {
        try {
            const userId = req.user?.id || req.body.userId;
            const { bookId } = req.body;
            if (!userId || !bookId) return res.status(400).json({ error: 'Dados incompletos' });
            await favoritesRepo.remove(userId, bookId);
            res.json({ ok: true });
        } catch (err) {
            next(err);
        }
    }
};