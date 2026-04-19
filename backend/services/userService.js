const userRepository = require('../repositories/userRepository');

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async createUser(username, email, password) {
        // Check if user already exists
        const existingEmail = await userRepository.findByEmail(email);
        if (existingEmail) {
            throw new Error('Email already exists');
        }

        const existingUsername = await userRepository.findByUsername(username);
        if (existingUsername) {
            throw new Error('Username already exists');
        }

        // TODO: Hash password with bcrypt in production
        const password_hash = password; // Temporary - should use bcrypt!

        return await userRepository.create(username, email, password_hash);
    }

    async updateUser(id, username, email) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        return await userRepository.update(id, username, email);
    }

    async deleteUser(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        return await userRepository.delete(id);
    }
}

module.exports = new UserService();