const { User } = require('../models')
const AuthService = require('../services/authService')
const db = require('../config/db')
const jwt = require('../middlewares/jwt')


const createUser = async(req ,res) => {
    try{
        const UserPlain = await AuthService.createUser(req.body);
        return res.status(201).json({message: "user has been created", UserPlain});
    }catch(err) {
        console.error(err.stack);
        return res.status(500).json({message: err.stack})
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const userPlain = await AuthService.login(email, password);
        return res.status(200).json(userPlain);
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}

const getUserInfo = async(req, res) => {
    try{
        const decoded = req.user;
        let user = await db.query("SELECT * FROM users WHERE email = ?", [decoded.email]);
        return res.status(200).json(user);
    } catch(err) {
        return res.status(500).json({message: err.stack})
    }
}       


module.exports = { createUser, login, getUserInfo }