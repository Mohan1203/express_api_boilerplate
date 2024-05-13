const { loginUser, registerUser, handleRequestQuery } = require('../controllers/userController');
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require("../multer/multer")
const router = express.Router();

router.route('/registeruser').post(registerUser)
router.route('/loginuser').post(loginUser)
router.route("/requstquery").get(handleRequestQuery)

module.exports = router