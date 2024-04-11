const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
const bcrypt = require('bcryptjs')

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
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password must required"]
    }
})

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password.toString(), 8)
    }
    next()
})

userSchema.method('validatePassword', async function (password) {
    const isValid = await bcrypt.compare(password.toString(), this.password)
    return isValid
})



const UserModel = new mongoose.model("user", userSchema)

module.exports = UserModel;