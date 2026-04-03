const userRepo = require('../repositories/userRepository');

const getAllUsers = async () => {
    const { rows } = await userRepo.findAll();
    return rows;
};

const getUserById = async (id) => {
    const { rows } = await userRepo.findById(id);
    if (!rows[0]) throw new Error('User not found');
    return rows[0];
};

const createUser = async (name, email) => {
    if (!name) throw new Error('Name is required');
    if (!email) throw new Error('email is required');
    const { rows } = await userRepo.create(name, email);
    return rows[0];
};

const updateUser = async (id, name, email) => {
    const { rows } = await userRepo.update(id, name, email);
    if (!rows[0]) throw new Error('User not found');
    return rows[0];
};

const deleteUser = async (id) => {
    await userRepo.remove(id);
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };