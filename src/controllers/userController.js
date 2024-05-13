const { asyncErrorHandler, ErrorHandlerClass } = require('express_centralized_error_handler')
const jwtTokenGenerator = require("../utils/jswTokenGenerator");
const reader = require('xlsx')
const mammoth = require("mammoth");
const { User } = require('../models/userModel');
const jwt = require('jsonwebtoken')
const Request = require("../models/requestModel")
const { v4: uuidv4 } = require("uuid")
const { JwtToken } = require("../models/userModel")

exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    const { email, name, phone } = req.body;
    await User.sync()
    const user = await User.findOne({ where: { email } });
    if (user) {
        return next(new ErrorHandlerClass("User already exist", 409))
    }
    const newUser = await User.create({ userName: name, email: email, mobileNumber: phone })
    return res.status(200).json({ message: "User created successfuly" })
})


//handle user login request
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;
    const isAuthenticatedUser = await User.findOne({ where: { email } })
    if (!isAuthenticatedUser) {
        return next(new ErrorHandlerClass("user not found", 404))
    }
    const requestQueueToken = uuidv4()
    await Request.sync()
    const userInQueue = await Request.create({ userId: isAuthenticatedUser.id, requestStatus: 1, requestToken: requestQueueToken })
    res.cookie('requestToken', requestQueueToken, { httpOnly: true })
    return res.status(200).json({ message: "request successfully send to admin" })
})


// handle query for request status from user
exports.handleRequestQuery = asyncErrorHandler(async (req, res, next) => {
    const requestToken = req.cookies.requestToken;
    if (!requestToken) {
        return next(new ErrorHandlerClass("request token not found", 404))
    }
    const request = await Request.findOne({ where: { requestToken: requestToken } })
    if (request.requestStatus == 1) {
        return res.status(200).json({ message: "Your request is still pending" })
    } else if (request.requestStatus == 0) {
        res.clearCookie("requestToken")
        return res.status(200).send({ message: "Your request has been rejected" })
    } else if (request.requestStatus == 2) {
        const user = await User.findOne({ where: { id: requestToken.userId } })
        const token = await jwtTokenGenerator(user)
        const jwtToken = await JwtToken.create({
            jwtToken: token,
            userId: user.id
        })
        res.cookie('jwtToken', token, { httpOnly: true })
        res.clearCookie("requestToken")
        return res.status(200).json({ data: user })
    }
})
