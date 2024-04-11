const { asyncErrorHandler, ErrorHandlerClass } = require('express_centralized_error_handler')
const userModel = require("../models/usermodel");
const jwtTokenGenerator = require("../utils/jswTokenGenerator");

exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    console.log(req)
    const { email, userName, password } = req.body;

    const user = await userModel.findOne({ email: email })
    if (user) {
        next(new ErrorHandlerClass("User already exists", 409))
    }

    const newUser = new userModel({
        userName,
        email,
        password
    })

    const savedUser = await newUser.save()
    return res.status(200).json(savedUser)

})

exports.loginUser = asyncErrorHandler(async function (req, res, next) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email })

    if (!user) {
        return next(new ErrorHandlerClass("User not found", 404))
    }

    const validUser = await user.validatePassword(password)

    if (!validUser) {
        return next(new ErrorHandlerClass("Invalid credentials", 401))
    }

    const jwtToken = await jwtTokenGenerator(user)
    res.cookie('token', jwtToken, { maxAge: 24 * 60 * 60 * 1000 })
    return res.status(200).json('User login successful')
})

exports.testing = asyncErrorHandler(async function (req, res, next) {
    return res.status(200).json('Test successful')
})
