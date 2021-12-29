var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    rol: {
        type: String
    },
    timestamp : {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
