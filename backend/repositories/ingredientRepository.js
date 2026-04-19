const pool = require('../db/connection');

class IngredientRepository {
    async findByRecipeId(recipeId) {
        const query = `
            SELECT * FROM recipe_ingredients 
            WHERE recipe_id = $1
            ORDER BY id
        `;
        const result = await pool.query(query, [recipeId]);
        return result.rows;
    }

    async create(recipeId, ingredientName, quantity) {
        const query = `
            INSERT INTO recipe_ingredients (recipe_id, ingredient_name, quantity)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await pool.query(query, [recipeId, ingredientName, quantity]);
        return result.rows[0];
    }

    async createMany(recipeId, ingredients) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            
            const createdIngredients = [];
            for (const ingredient of ingredients) {
                const query = `
                    INSERT INTO recipe_ingredients (recipe_id, ingredient_name, quantity)
                    VALUES ($1, $2, $3)
                    RETURNING *
                `;
                const result = await client.query(query, [
                    recipeId,
                    ingredient.name,
                    ingredient.quantity
                ]);
                createdIngredients.push(result.rows[0]);
            }
            
            await client.query('COMMIT');
            return createdIngredients;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async update(id, ingredientName, quantity) {
        const query = `
            UPDATE recipe_ingredients 
            SET ingredient_name = $1, quantity = $2
            WHERE id = $3
            RETURNING *
        `;
        const result = await pool.query(query, [ingredientName, quantity, id]);
        return result.rows[0];
    }

    async deleteByRecipeId(recipeId) {
        const query = 'DELETE FROM recipe_ingredients WHERE recipe_id = $1';
        await pool.query(query, [recipeId]);
    }

    async delete(id) {
        const query = 'DELETE FROM recipe_ingredients WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new IngredientRepository();