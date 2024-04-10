const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const userSchema = new Schema({
    userName: {
        type: String,
        require: [true, "username must required"],
        unique: [true, "username must unique"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        require: [true, "Email must required"],
        unique: [true, "Email must unique"],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.text(value)
            },
            message: 'Invalid email address'
        },
        lowercase: true
    },
    password: {
        type: string,
        required: [true, "password must required"]
    }
})

const UserModel = new mongoose.model("user", userSchema)

module.exports = UserModel;