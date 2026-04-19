const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

// GET all ingredients for a recipe
router.get('/recipe/:recipe_id', ingredientController.getIngredientsByRecipe);

// POST add ingredient to recipe
router.post('/', ingredientController.addIngredient);

// PUT update ingredient
router.put('/:id', ingredientController.updateIngredient);

// DELETE ingredient
router.delete('/:id', ingredientController.deleteIngredient);

module.exports = router;