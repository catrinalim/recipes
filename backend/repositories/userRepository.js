const db = require('../db');

const findAll = () => db.query('SELECT * FROM users')

const findById = (id) => db.query('SELECT * FROM users WHERE id = $1', [id]);

const create = (name, email) =>
    db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);

const update = (id, name, email) =>
    db. query('UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *', [name, email, id]);

const remove = (id) => db.query('DELETE FROM users WHERE id = $1', [id]);

module.exports = { findAll, findById, create, update, remove };