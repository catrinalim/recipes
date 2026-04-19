const recipeService = require('../services/recipeService');
const matchingService = require('../services/matchingService');

exports.getAllRecipes = async (req, res) => {
    try {
        const { user_id } = req.query;
        const recipes = await recipeService.getAllRecipesByUser(user_id);
        res.json(recipes);
    } catch (error) {
        console.error('Error getting recipes:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await recipeService.getRecipeById(id);
        res.json(recipe);
    } catch (error) {
        console.error('Error getting recipe:', error);
        const status = error.message === 'Recipe not found' ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};

exports.createRecipe = async (req, res) => {
    try {
        const { user_id, title, directions, notes, ingredients } = req.body;
        const recipe = await recipeService.createRecipe(user_id, title, directions, notes, ingredients);
        res.status(201).json(recipe);
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, directions, notes, ingredients } = req.body;
        const recipe = await recipeService.updateRecipe(id, title, directions, notes, ingredients);
        res.json(recipe);
    } catch (error) {
        console.error('Error updating recipe:', error);
        const status = error.message === 'Recipe not found' ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        await recipeService.deleteRecipe(id);
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error('Error deleting recipe:', error);
        const status = error.message === 'Recipe not found' ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};

exports.getSuggestions = async (req, res) => {
    try {
        const { user_id } = req.body;
        const suggestions = await matchingService.getSuggestions(user_id);
        res.json(suggestions);
    } catch (error) {
        console.error('Error getting suggestions:', error);
        res.status(500).json({ error: error.message });
    }
};