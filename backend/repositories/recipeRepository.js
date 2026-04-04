const db = require ('../db');

const findAllByUser = (user_id) =>
    db.query('SELECT * FROM recipes WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);

const findById = (id) =>
    db.query('SELECT * FROM recipes WHERE id = $1', [id]);

const create = (user_id, title, directions, notes) =>
    db.query(
        'INSERT INTO recipes (user_id, title, directions, notes) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, title, directions, notes]
    );

const update = (id, title, directions, notes) =>
    db.query(
        'UPDATE recipes SET title=$1, directions=$2, notes=$3 WHERE id=$4 RETURNING *',
        [title, directions, notes, id]
    );

const remove = (id) =>
    db.query('DELETE FROM recipes WHERE id = $1', [id]);

module.exports ={ findAllByUser, findById, create, update, remove }