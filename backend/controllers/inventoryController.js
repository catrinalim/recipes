const inventoryService = require('../services/inventoryService');

exports.getInventory = async (req, res) => {
    try {
        const { user_id } = req.query;
        const inventory = await inventoryService.getInventory(user_id);
        res.json(inventory);
    } catch (error) {
        console.error('Error getting inventory:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.addIngredient = async (req, res) => {
    try {
        const { user_id, ingredient_name } = req.body;
        const ingredient = await inventoryService.addIngredient(user_id, ingredient_name);
        res.status(201).json(ingredient);
    } catch (error) {
        console.error('Error adding ingredient:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.updateIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const { ingredient_name } = req.body;
        const ingredient = await inventoryService.updateIngredient(id, ingredient_name);
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
        await inventoryService.deleteIngredient(id);
        res.json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        const status = error.message === 'Ingredient not found' ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};