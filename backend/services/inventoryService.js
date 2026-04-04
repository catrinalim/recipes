const inventoryRepo = require('../repositories/inventoryRepository');

const getInventory = async (user_id) => {
  const { rows } = await inventoryRepo.findByUser(user_id);
  return rows;
};

const addToInventory = async (user_id, ingredient_name) => {
  if (!ingredient_name) throw new Error('Ingredient name is required');
  const { rows } = await inventoryRepo.addItem(user_id, ingredient_name.toLowerCase().trim());
  return rows[0];
};

const removeFromInventory = async (user_id, ingredient_name) => {
  await inventoryRepo.removeItem(user_id, ingredient_name);
};

const getMakeableRecipes = async (user_id) => {
  const { rows } = await inventoryRepo.findMakeableRecipes(user_id);
  return rows;
};

module.exports = { getInventory, addToInventory, removeFromInventory, getMakeableRecipes };