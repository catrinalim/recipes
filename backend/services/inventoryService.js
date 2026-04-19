const inventoryRepository = require('../repositories/inventoryRepository');

class InventoryService {
    async getInventory(userId) {
        return await inventoryRepository.findByUserId(userId);
    }

    async addIngredient(userId, ingredientName) {
        if (!userId || !ingredientName) {
            throw new Error('User ID and ingredient name are required');
        }

        return await inventoryRepository.create(userId, ingredientName);
    }

    async updateIngredient(id, ingredientName) {
        const ingredient = await inventoryRepository.update(id, ingredientName);
        if (!ingredient) {
            throw new Error('Ingredient not found');
        }
        return ingredient;
    }

    async deleteIngredient(id) {
        const ingredient = await inventoryRepository.delete(id);
        if (!ingredient) {
            throw new Error('Ingredient not found');
        }
        return ingredient;
    }
}

module.exports = new InventoryService();