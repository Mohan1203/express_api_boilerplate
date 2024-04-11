const { testing, loginUser, registerUser, getUserDetail } = require('../controllers/userController');
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.route('/').get(testing)
router.route('/registeruser').post(registerUser)
router.route('/loginuser').post(loginUser)
router.route('/userdetail').get(authMiddleware, getUserDetail)

module.exports = router