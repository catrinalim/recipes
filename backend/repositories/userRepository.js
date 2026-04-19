const pool = require('../db/connection');

class UserRepository {
    async findAll() {
        const query = 'SELECT id, username, email, created_at FROM users';
        const result = await pool.query(query);
        return result.rows;
    }

    async findById(id) {
        const query = 'SELECT id, username, email, created_at FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }

    async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await pool.query(query, [username]);
        return result.rows[0];
    }

    async create(username, email, password_hash) {
        const query = `
            INSERT INTO users (username, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at
        `;
        const result = await pool.query(query, [username, email, password_hash]);
        return result.rows[0];
    }

    async update(id, username, email) {
        const query = `
            UPDATE users 
            SET username = $1, email = $2
            WHERE id = $3
            RETURNING id, username, email, created_at
        `;
        const result = await pool.query(query, [username, email, id]);
        return result.rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new UserRepository();