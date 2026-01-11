const { User } = require('../models/userModel');
const db = require('../config/db');
const jwt = require('../middlewares/jwt');
const bcrypt = require('bcrypt');

class AuthService {
    static async createUser(userData) {
        try {
            let hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;

            let user = await User.create(userData);

            const token = jwt.generateToken({ id: user.id, email: user.email });

            let UserPlain = user.get({ plain: true });
            delete UserPlain.password;
            UserPlain.token = token;
            
            return UserPlain;
        } catch (err) {
            throw new Error(err.stack);
        }
    }

    static async login(email, password) {
        const user = await User.findOne({ where: { email } });

        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw new Error("Invalid password");

        const token = jwt.generateToken({ id: user.id, email: user.email });

        const userPlain = user.get({ plain: true });
        delete userPlain.password;
        userPlain.token = token;

        return userPlain;
    }
}