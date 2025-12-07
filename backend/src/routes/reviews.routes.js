const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const validateReview = require('../middlewares/validateReview');

router.get('/book/:bookId', reviewsController.listByBook);
router.post('/', validateReview, reviewsController.create);

module.exports = router;
