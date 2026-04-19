const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getInventory);
router.post('/', inventoryController.addIngredient);
router.put('/:id', inventoryController.updateIngredient);
router.delete('/:id', inventoryController.deleteIngredient);

module.exports = router;