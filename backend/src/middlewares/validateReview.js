module.exports = function validateReview(req, res, next) {
  const { bookId, rating } = req.body;
  if (!bookId) return res.status(400).json({ error: 'bookId é obrigatório' });
  if (rating == null) return res.status(400).json({ error: 'rating é obrigatório' });
  const r = Number(rating);
  if (!Number.isInteger(r) || r < 1 || r > 5) return res.status(400).json({ error: 'rating deve ser inteiro entre 1 e 5' });
  next();
};
