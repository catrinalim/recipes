const ingredientService = require('../services/ingredientService');

exports.getIngredientsByRecipe = async (req, res) => {
    try {
        const { recipe_id } = req.params;
        const ingredients = await ingredientService.getIngredientsByRecipe(recipe_id);
        res.json(ingredients);
    } catch (error) {
        console.error('Error getting ingredients:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.addIngredient = async (req, res) => {
    try {
        const { recipe_id, ingredient_name, quantity } = req.body;
        const ingredient = await ingredientService.addIngredient(recipe_id, ingredient_name, quantity);
        res.status(201).json(ingredient);
    } catch (error) {
        console.error('Error adding ingredient:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.updateIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const { ingredient_name, quantity } = req.body;
        const ingredient = await ingredientService.updateIngredient(id, ingredient_name, quantity);
        res.json(ingredient);
    } catch (error) {
        console.error('Error updating ingredient:', error);
        const status = error.message === 'Ingredient not found' ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};

exports.deleteIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        await ingredientService.deleteIngredient(id);
        res.json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        const status = error.message === 'Ingredient not found' ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};