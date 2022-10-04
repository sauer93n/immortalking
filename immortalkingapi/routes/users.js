var express = require('express');
var router = express.Router();
const tokenService = require('../services/token-service');
const UserDTO = require('../dtos/UserDTO');

const {userModel, tokenModel} = require('../models/models');
const UserController = require('../controllers/UserController');

/* GET users listing. */
router.post('/login', UserController.login);

router.post('/register', UserController.register)

module.exports = router;
