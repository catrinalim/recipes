const ingredientService = require('../services/ingredientService');

const getAll = async (req, res) => {
  try {
    const ingredients = await ingredientService.getIngredientsForRecipe(req.params.recipe_id, req.user.id);
    res.json(ingredients);
  } catch (err) {
    const status = err.message === 'Forbidden' ? 403 : 404;
    res.status(status).json({ error: err.message });
  }
};

const add = async (req, res) => {
  try {
    const ingredient = await ingredientService.addIngredient(req.params.recipe_id, req.user.id, req.body);
    res.status(201).json(ingredient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await ingredientService.deleteIngredient(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAll, add, remove };