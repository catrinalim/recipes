const recipeService = require('../services/recipeService');

const getAll = async (req, res) => {
  try {
    const recipes = await recipeService.getUserRecipes(req.user.id);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id, req.user.id);
    res.json(recipe);
  } catch (err) {
    const status = err.message === 'Forbidden' ? 403 : 404;
    res.status(status).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const recipe = await recipeService.createRecipe(req.user.id, req.body);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const recipe = await recipeService.updateRecipe(req.params.id, req.user.id, req.body);
    res.json(recipe);
  } catch (err) {
    const status = err.message === 'Forbidden' ? 403 : 400;
    res.status(status).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await recipeService.deleteRecipe(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };