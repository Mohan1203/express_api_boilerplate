const express = require('express')
const router = express.Router()
const { adminLogin, handleAdminLoginPage, homepage, searchPage, hashtagsPage, notesPage, sendPendingRequest, usersPage, errorHandlerPage,handleRequests } = require("../controllers/adminController")
const adminAuth = require("../middleware/adminAuthMiddleware")

// router.route('/registeradmin').post(adminRegister)
router.route('/login').post(adminLogin).get(handleAdminLoginPage)
router.route("/").get(adminAuth, homepage)
router.route("/search").get(adminAuth, searchPage)
router.route("/hashtags").get(adminAuth, hashtagsPage)
router.route("/notes").get(adminAuth, notesPage)
router.route("/requests").get(adminAuth, sendPendingRequest)
router.route("/handleRequest").post(adminAuth, handleRequests)
router.route("/users").get(adminAuth, usersPage)

module.exports = router