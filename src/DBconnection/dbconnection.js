const mongoose = require('mongoose')
const { ErrorHandlerClass } = require('express_centralized_error_handler')


const databaseConnection = () => {
    const connection = mongoose.connect(process.env.DATABASE_URI).then(() => {
        console.log('database connection established')
    }).catch((err) => {
        console.log(err.message)
    })
}

module.exports = databaseConnection