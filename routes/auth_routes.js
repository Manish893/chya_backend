const express = require('express');
const route = express.Router();
const authController = require('../contollers/auth_controller');
//chya/register
route.post('/register',authController.registerUser);
route.post('/login',authController.loginUser);


module.exports = route;
