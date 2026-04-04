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

const addIngredient = async (recipe_id, user_id, { ingredient_name, quantity }) => {
  if (!ingredient_name) throw new Error('Ingredient name is required');
  const { rows: recipeRows } = await recipeRepo.findById(recipe_id);
  const recipe = recipeRows[0];
  if (!recipe) throw new Error('Recipe not found');
  if (recipe.user_id !== parseInt(user_id)) throw new Error('Forbidden');
  const { rows } = await ingredientRepo.addToRecipe(recipe_id, ingredient_name, quantity);
  return rows[0];
};

const deleteIngredient = async (id, user_id) => {
  await ingredientRepo.remove(id);
};

module.exports = { getIngredientsForRecipe, addIngredient, deleteIngredient };