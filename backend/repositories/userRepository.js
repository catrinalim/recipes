const db = require('../db');

const findById = (id) =>
  db.query('SELECT id, username, email, created_at FROM users WHERE id = $1', [id]);

const findByEmail = (email) =>
  db.query('SELECT * FROM users WHERE email = $1', [email]);

const create = (username, email, password_hash) =>
  db.query(
    'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
    [username, email, password_hash]
  );

module.exports = { findById, findByEmail, create };