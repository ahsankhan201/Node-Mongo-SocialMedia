const express = require('express');
const { follow, like, userDetails, getAllUsers, getUserById } = require('../controllers/network/networkController');
const router = express.Router();
const { authenticate } = require('../middlewares/auth')

router.post('/follow' , follow)
router.post('/like'  , like)
router.get('/getUserDetails' ,authenticate  , userDetails)
router.get('/getAllUsers'  , getAllUsers)
router.get('/getUserById'  , getUserById)


module.exports = router
