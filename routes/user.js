const express = require('express');
const authController = require('../controllers/auth/index');
const router = express.Router();
const userModel = require('../models/members')



router.post('/addUser' ,authController.createUser)
router.post('/login' ,authController.login(userModel))


module.exports = router
