const express = require('express');
const { getUserInfo, createUser, login } = require('../controllers/userController')
const { verifyToken } = require('../middlewares/jwt')

const userRoutes = express.Router()

userRoutes.get('/info/:id', verifyToken, getUserInfo);
userRoutes.post('/store', createUser);
userRoutes.post('/login', login);

module.exports = userRoutes;