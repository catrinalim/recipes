const db = require('../db');

const findByRecipe = (recipe_id) =>
    db.query('SELECT * FROM recipe_ingredients WHERE recipe_id = $1', [recipe_id]);

const addToRecipe = (recipe_id, ingredient_name, quantity) =>
    db.query(
        'INSERT INTO recipe_ingredients (recipe_id, ingredient_name, quantity) VALUES ($1, $2, $3) RETURNING *',
        [recipe_id, ingredient_name, quantity]
    );

const remove = (id) =>
    db.query('DELETE FROM recipe_ingredients WHERE id = $1', [id]);

module.exports = { findByRecipe, addToRecipe, remove };