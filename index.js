const express = require('express')
const { errorHandlerMiddleware, asyncErrorHandler } = require('express_centralized_error_handler')
const databaseConnection = require("./src/DBconnection/dbconnection")
const cookieParser = require('cookie-parser')
const authenticateUser = require('./src/middleware/authMiddleware')
const userRoute = require("./src/routes/userRoute")

const app = express();
require('dotenv').config();
databaseConnection()

app.use(cookieParser())
app.use(express.json())
app.use("/api/v1/user", userRoute);

app.use(errorHandlerMiddleware)

module.exports = app