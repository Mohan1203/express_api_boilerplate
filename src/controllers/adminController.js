const { ErrorHandlerClass, errorHandlerMiddleware, asyncErrorHandler } = require("express_centralized_error_handler")
const jswTokenGenerator = require("../utils/jswTokenGenerator")
const Admin = require("../models/adminModel")
const bcrypt = require("bcryptjs")
const Request = require("../models/requestModel")
const { User } = require("../models/userModel")


// for register admin
// exports.adminRegister = asyncErrorHandler(async (req, res, next) => {
//     const { email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10)
//     await Admin.sync()
//     const admin = await Admin.create({
//         adminEmail: email,
//         adminPassword: hashedPassword
//     })
//     res.render("layout.js")
//     res.status(200).json({ message: "Admin created succesfully" })
// })

// for login admin
exports.adminLogin = asyncErrorHandler(async (req, res, next) => {
    let error = '';

    const { email, password } = req.body;
    const isAdmin = await Admin.findOne({ where: { adminEmail: email } })
    if (!isAdmin) {
        error = "Only admin can access dashboard"
        return res.render("login", { error })
    }
    const authenticAdmin = await bcrypt.compare(password, isAdmin.adminPassword)
    if (!authenticAdmin) {
        error = "invalid creditial"
        return res.render("login", { error })
    }
    const adminToken = await jswTokenGenerator(authenticAdmin)

    res.cookie('token', adminToken, { httpOnly: true, maxAge: 86400000 })
    res.redirect("/")
})


// handle admin login page loading
exports.handleAdminLoginPage = asyncErrorHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        res.redirect("/")
    }
    res.render("login", { error: "" })
})


// request page 
exports.sendPendingRequest = asyncErrorHandler(async (req, res, next) => {
    const pendingRequests = await Request.findAll({
        where: { requestStatus: 1 },
        attributes: ['requestToken', 'userId'],
        include: User
    });
    return res.render("requests", data = { active: "requests", requests: pendingRequests })
})

//handle request operation
exports.handleRequests = asyncErrorHandler(async (req, res, next) => {
    const { requestStatus } = req.body;
    const { status, requestToken } = JSON.parse(requestStatus)
    const request = await Request.findOne({ where: { requestToken, requestStatus: 1 } })


})

//Routes for render pages
exports.homepage = asyncErrorHandler(async (req, res, next) => {
    res.render("index", {
        data: {
            active: '/'
        }
    })
})


exports.searchPage = asyncErrorHandler(async (req, res, next) => {
    res.render("search", {
        data: {
            active: '/search'
        }
    })
})

exports.hashtagsPage = asyncErrorHandler(async (req, res, next) => {
    res.render("hashtags", {
        data: {
            active: "/hashtags"
        }
    })
})

exports.usersPage = asyncErrorHandler(async (req, res, next) => {
    res.render("users", {
        data: {
            active: "/users"
        }
    })
})

exports.notesPage = asyncErrorHandler(async (req, res, next) => {
    res.render("notes", {
        data: {
            active: "/notes"
        }
    })
})


exports.errorHandlerPage = asyncErrorHandler(async (req, res, next) => {
    res.render("error", {
        data: {
            active: "/error"
        }
    })
})