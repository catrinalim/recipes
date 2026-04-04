const db = require('../db');

const findByUser = (user_id) =>
    db.query('SELECT * FROM user_inventory WHERE user_id = $1 ORDER BY added_at DESC', [user_id]);

const addItem = (user_id, ingredient_name) =>
    db.query(
        'INSERT INTO user_inventory (user_id, ingredient_name) VALUES ($1, $2) on CONFLICT DO NOTHING RETURNING *',
        [user_id, ingredient_name]
    );

const removeItem = (user_id, ingredient_name) =>
    db.query(
        'DELETE FROM user_inventory WHERE user_id = $1 AND ingredient_name = $2',
        [user_id, ingredient_name]
    );

const findMakeableRecipes = (user_id) =>
    db.query(`
        SELECT r.id, r.title, r.notes
        FROM recipes r
        WHERE r.user_id = $1
            AND NOT EXISTS (
                SELECT 1 FROM recipe_ingredients ri
                WHERE ri.recipe_id = r.id
                    AND ri.ingredient_name NOT IN (
                        SELECT ingredient_name FROM user_inventory WHERE user_id = $1
                    )
            )
        `, [user_id]);

module.exports = { findByUser, addItem, removeItem, findMakeableRecipes };