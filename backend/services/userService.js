const userRepo = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

const getUserById = async (id) => {
  const { rows } = await userRepo.findById(id);
  if (!rows[0]) throw new Error('User not found');
  return rows[0];
};

const register = async (username, email, password) => {
  if (!username || !email || !password) throw new Error('All fields are required');
  const password_hash = await bcrypt.hash(password, 10);
  const { rows } = await userRepo.create(username, email, password_hash);
  return rows[0];
};

const login = async (email, password) => {
    const { rows } = await userRepo.findByEmail(email);
    const user = rows[0];
    if (!user) throw new Error('Invalid credentials');
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new Error('Invalid credentials');
    return user;
};

module.exports = { getUserById, register, login }