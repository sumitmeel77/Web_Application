const mongoose = require('mongoose')

// creating mongoose schema 
const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        tokens: [Object]
    },
    { collection: 'User' }
)
const User = mongoose.model('user', UserSchema)
module.exports = User