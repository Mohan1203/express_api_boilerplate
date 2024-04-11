const { testing, loginUser, registerUser } = require('../controllers/userController');
const express = require('express');

const router = express.Router();


router.route('/').get(testing)
router.route('/registeruser').post(registerUser)
router.route('/loginuser').post(loginUser)

module.exports = router