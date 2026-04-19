const ingredientRepository = require('../repositories/ingredientRepository');

class IngredientService {
    async getIngredientsByRecipe(recipeId) {
        return await ingredientRepository.findByRecipeId(recipeId);
    }

    async addIngredient(recipeId, ingredientName, quantity) {
        if (!recipeId || !ingredientName) {
            throw new Error('Recipe ID and ingredient name are required');
        }

        return await ingredientRepository.create(recipeId, ingredientName, quantity);
    }

    async updateIngredient(id, ingredientName, quantity) {
        const ingredient = await ingredientRepository.update(id, ingredientName, quantity);
        if (!ingredient) {
            throw new Error('Ingredient not found');
        }
        return ingredient;
    }

    async deleteIngredient(id) {
        const ingredient = await ingredientRepository.delete(id);
        if (!ingredient) {
            throw new Error('Ingredient not found');
        }
        return ingredient;
    }
}

module.exports = new IngredientService();