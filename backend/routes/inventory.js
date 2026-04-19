const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// GET user inventory
router.get('/', inventoryController.getInventory);

// POST add ingredient to inventory
router.post('/', inventoryController.addIngredient);

// PUT update ingredient in inventory
router.put('/:id', inventoryController.updateIngredient);

// DELETE ingredient from inventory
router.delete('/:id', inventoryController.deleteIngredient);

module.exports = router;