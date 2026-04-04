const inventoryService = require('../services/inventoryService');

const getInventory = async (req, res) => {
  try {
    const items = await inventoryService.getInventory(req.user.id);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addItem = async (req, res) => {
  try {
    const item = await inventoryService.addToInventory(req.user.id, req.body.ingredient_name);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeItem = async (req, res) => {
  try {
    await inventoryService.removeFromInventory(req.user.id, req.params.ingredient_name);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getMakeableRecipes = async (req, res) => {
  try {
    const recipes = await inventoryService.getMakeableRecipes(req.user.id);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getInventory, addItem, removeItem, getMakeableRecipes };