const pool = require('../db/connection');

class RecipeRepository {
    async findAllByUserId(userId) {
        const query = `
            SELECT 
                r.*,
                json_agg(
                    json_build_object(
                        'id', ri.id,
                        'name', ri.ingredient_name,
                        'quantity', ri.quantity
                    )
                ) as ingredients
            FROM recipes r
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            WHERE r.user_id = $1
            GROUP BY r.id
            ORDER BY r.created_at DESC
        `;
        const result = await pool.query(query, [userId]);
        return result.rows;
    }

    async findById(id) {
        const query = 'SELECT * FROM recipes WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async create(userId, title, directions, notes) {
        const query = `
            INSERT INTO recipes (user_id, title, directions, notes)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await pool.query(query, [userId, title, directions, notes]);
        return result.rows[0];
    }

    async update(id, title, directions, notes) {
        const query = `
            UPDATE recipes 
            SET title = $1, directions = $2, notes = $3
            WHERE id = $4
            RETURNING *
        `;
        const result = await pool.query(query, [title, directions, notes, id]);
        return result.rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM recipes WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new RecipeRepository();