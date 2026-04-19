const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        const status = error.message === 'User not found' ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userService.createUser(username, email, password);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const user = await userService.updateUser(id, username, email);
        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        const status = error.message === 'User not found' ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        const status = error.message === 'User not found' ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};