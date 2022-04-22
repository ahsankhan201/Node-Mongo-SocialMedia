const express = require('express');
const { follow, like, userDetails } = require('../controllers/network/networkController');
const router = express.Router();
const { authenticate } = require('../middlewares/auth')

router.post('/follow' ,authenticate , follow)
router.post('/like' ,authenticate , like)
router.get('/getUserDetails'  , userDetails)


module.exports = router
