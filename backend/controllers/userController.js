const userService = require('../services/userService');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userService.register(username, email, password);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);
        res.json(user);
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
};

const getMe = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
};

module.exports = { register, login, getMe };