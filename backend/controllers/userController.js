const userService = requir('../services/userService');

const getAll = async (requestAnimationFrame, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOne = async (requestAnimationFrame, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await userService.createUser(name, email);
        res.status(201).json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await userService.updateUser(req.params.id, name, email);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(200).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { getAll, getOne, create, update, remove };