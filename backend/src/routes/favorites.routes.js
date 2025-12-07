const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

router.get('/', favoritesController.list.bind(favoritesController));
router.post('/', favoritesController.add.bind(favoritesController));
router.delete('/', favoritesController.remove.bind(favoritesController));

module.exports = router;
