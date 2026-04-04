const ingredientRepo = require('../repositories/ingredientRepository');
const recipeRepo = require('../repositories/recipeRepository');

const getIngredientsForRecipe = async (recipe_id, user_id) => {
    const { rows: recipeRows } = await recipeRepo.findById(recipe_id);
    const recipe = recipeRows[0];
    if (!recipe) throw new Error('Recipe not found');
    if (recipe.user_id !== parseInt(user_id)) throw new Error('Forbidden');
    const { rows } = await ingredientRepo.findByRecipe(recipe_id);
    return rows;
};

const getRecipeById = async (id, user_id) => {
  const { rows } = await recipeRepo.findById(id);
  const recipe = rows[0];
  if (!recipe) throw new Error('Recipe not found');
  if (recipe.user_id !== parseInt(user_id)) throw new Error('Forbidden');
  const { rows: ingredients } = await ingredientRepo.findByRecipe(id);
  return { ...recipe, ingredients };
};

const createRecipe = async (user_id, { title, directions, notes }) => {
  if (!title || !directions) throw new Error('Title and directions are required');
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

module.exports = { getUserRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe };