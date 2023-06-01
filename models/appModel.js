const mongoose = require('mongoose')
const {Schema} = mongoose

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('usermodel', schema)