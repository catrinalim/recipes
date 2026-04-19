const pool = require('../db/connection');

class InventoryRepository {
    async findByUserId(userId) {
        const query = `
            SELECT * FROM user_inventory 
            WHERE user_id = $1 
            ORDER BY ingredient_name ASC
        `;
        const result = await pool.query(query, [userId]);
        return result.rows;
    }

    async findIngredientNamesByUserId(userId) {
        const query = `
            SELECT LOWER(ingredient_name) as ingredient_name 
            FROM user_inventory 
            WHERE user_id = $1
        `;
        const result = await pool.query(query, [userId]);
        return result.rows.map(row => row.ingredient_name);
    }

    async create(userId, ingredientName) {
        const query = `
            INSERT INTO user_inventory (user_id, ingredient_name)
            VALUES ($1, $2)
            ON CONFLICT (user_id, ingredient_name) 
            DO UPDATE SET added_at = CURRENT_TIMESTAMP
            RETURNING *
        `;
        const result = await pool.query(query, [userId, ingredientName]);
        return result.rows[0];
    }

    async update(id, ingredientName) {
        const query = `
            UPDATE user_inventory 
            SET ingredient_name = $1
            WHERE id = $2
            RETURNING *
        `;
        const result = await pool.query(query, [ingredientName, id]);
        return result.rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM user_inventory WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new InventoryRepository();