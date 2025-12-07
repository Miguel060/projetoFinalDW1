const reviewsRepo = require('../repositories/reviewsRepository');

module.exports = {
  async listByBook(req, res, next) {
    try {
      const { bookId } = req.params;
      const reviews = await reviewsRepo.findByBookId(bookId);
      res.json(reviews);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const userId = req.user?.id || req.body.userId;
      const { bookId, rating, comment } = req.body;
      if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });
      const created = await reviewsRepo.create({ userId, bookId, rating, comment });
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }
};
