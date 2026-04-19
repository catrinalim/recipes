const recipeRepository = require('../repositories/recipeRepository');
const inventoryRepository = require('../repositories/inventoryRepository');
const ingredientRepository = require('../repositories/ingredientRepository');

class MatchingService {
    async getSuggestions(userId) {
        // Get user's inventory
        const userIngredients = await inventoryRepository.findIngredientNamesByUserId(userId);

        // Get all recipes for user
        const recipes = await recipeRepository.findAllByUserId(userId);

        // Calculate match scores
        const scoredRecipes = recipes.map(recipe => {
            const recipeIngredients = recipe.ingredients
                .filter(i => i.name) // Filter out null ingredients
                .map(i => i.name.toLowerCase());

            const matched = recipeIngredients.filter(ingredient =>
                userIngredients.includes(ingredient)
            );

            const matchPercentage = recipeIngredients.length > 0
                ? (matched.length / recipeIngredients.length) * 100
                : 0;

            const missingIngredients = recipeIngredients.filter(i =>
                !userIngredients.includes(i)
            );

            return {
                ...recipe,
                matchScore: Math.round(matchPercentage),
                matchedCount: matched.length,
                totalCount: recipeIngredients.length,
                missingIngredients: missingIngredients,
                matchLabel: this.getMatchLabel(matchPercentage)
            };
        });

        // Sort by match score (highest first)
        scoredRecipes.sort((a, b) => b.matchScore - a.matchScore);

        return scoredRecipes;
    }

    getMatchLabel(percentage) {
        if (percentage === 100) return 'GREAT MATCH';
        if (percentage >= 75) return 'GOOD MATCH';
        if (percentage >= 50) return 'FAIR MATCH';
        return 'POOR MATCH';
    }
}

module.exports = new MatchingService();