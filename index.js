const express = require('express')
const { errorHandlerMiddleware, asyncErrorHandler } = require('express_centralized_error_handler')
// const databaseConnection = require("./src/DBconnection/dbconnection")
const { connection } = require("./src/database/dbConnection")

const cookieParser = require('cookie-parser')
const authenticateUser = require('./src/middleware/authMiddleware')
const userRoute = require("./src/routes/userRoute")
const adminRoute = require("./src/routes/adminRoute")
const path = require('path');


const app = express();
require('dotenv').config();
app.set('view engine', 'ejs')
connection();



app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/user", userRoute);
app.use("/", adminRoute);

app.use(errorHandlerMiddleware)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/image')))
module.exports = app