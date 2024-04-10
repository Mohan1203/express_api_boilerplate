const express = require('express')
const { ErrorHandlerClass, errorHandlerMiddleware, asyncErrorHandler } = require('express_centralized_error_handler')
const databaseConnection = require("./src/DBconnection/dbconnection")
const cookieParser = require('cookie-parser')
const authenticateUser = require('./src/middleware/authMiddleware')


const app = express();
require('dotenv').config();
databaseConnection()

app.use(cookieParser())

app.get("/", authenticateUser, asyncErrorHandler((req, res, next) => {
    console.log("Hello world")
}))

app.use(errorHandlerMiddleware)

module.exports = app