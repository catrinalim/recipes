const recipeRepository = require('../repositories/recipeRepository');
const ingredientRepository = require('../repositories/ingredientRepository');

class RecipeService {
    async getAllRecipesByUser(userId) {
        return await recipeRepository.findAllByUserId(userId);
    }

    async getRecipeById(id) {
        const recipe = await recipeRepository.findById(id);
        if (!recipe) {
            throw new Error('Recipe not found');
        }

        const ingredients = await ingredientRepository.findByRecipeId(id);
        return { ...recipe, ingredients };
    }

    async createRecipe(userId, title, directions, notes, ingredients) {
        // Validate required fields
        if (!title || !directions) {
            throw new Error('Title and directions are required');
        }

        // Create recipe
        const recipe = await recipeRepository.create(userId, title, directions, notes);

        // Add ingredients if provided
        if (ingredients && ingredients.length > 0) {
            await ingredientRepository.createMany(recipe.id, ingredients);
        }

        return recipe;
    }

    async updateRecipe(id, title, directions, notes, ingredients) {
        const recipe = await recipeRepository.findById(id);
        if (!recipe) {
            throw new Error('Recipe not found');
        }

        const updatedRecipe = await recipeRepository.update(id, title, directions, notes);

        // Update ingredients if provided
        if (ingredients) {
            await ingredientRepository.deleteByRecipeId(id);
            await ingredientRepository.createMany(id, ingredients);
        }

        return updatedRecipe;
    }

    async deleteRecipe(id) {
        const recipe = await recipeRepository.findById(id);
        if (!recipe) {
            throw new Error('Recipe not found');
        }

        return await recipeRepository.delete(id);
    }
}

module.exports = new RecipeService();