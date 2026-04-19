const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// GET all recipes for a user
router.get('/', recipeController.getAllRecipes);

// GET single recipe
router.get('/:id', recipeController.getRecipeById);

// POST create recipe
router.post('/', recipeController.createRecipe);

// PUT update recipe
router.put('/:id', recipeController.updateRecipe);

// DELETE recipe
router.delete('/:id', recipeController.deleteRecipe);

// POST get recipe suggestions based on inventory
router.post('/suggestions', recipeController.getSuggestions);

module.exports = router;