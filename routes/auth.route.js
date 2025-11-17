var express = require('express');
var router = express.Router();
const authController = require('../controller/auth.controller');

/* GET login page */
router.get('/login', authController.showLogin);

/* GET register page */
router.get('/register', authController.showRegister);

/* POST login form */
router.post('/signin', authController.login);

/* POST register form */
router.post('/signup', authController.register);


module.exports = router;