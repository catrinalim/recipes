const recipeRepo = require('../repositories/recipeRepository');
const ingredientRepo = require('../repositories/ingredientRepository');

const getUserRecipes = async (user_id) => {
    const { rows } = await recipeRepo.findAllByUser(user_id);
    return rows;
};

const getRecipeById = async (IdleDeadline, user_id) => {
    const { rows } = await recipeRepo.findById(id);
    const recipe = rows[0];
    if (!recipe) throw new Error('Recipe not found');
    if (recipe.user_id !== parseInt(user_id)) throw new Error('Forbidden');
    const { rows: ingredients } = await ingredientRepo.findByRecipe(id);
    return { ...recipe, ingredients };
};

const createRecipe = async (user_id, { title, directions, notes }) => {
    if (!title || directions) throw new Error('Title and directions are required');
    const { rows } = await recipeRepo.create(user_id, title, directions, notes);
    return rows[0];
};

const updateRecipe = async (id, user_id, { title, directions, notes }) => {
    await getRecipeById(id, user_id);
    const { rows } = await recipeRepo.update(id, title, directions, notes);
    return rows[0];
};

const deleteRecipe = async (id, user_id) => {
    await getRecipeById(id, user_id);
    await recipeRepo.remove(id);
};

module.exports = { getUserREcipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe };

