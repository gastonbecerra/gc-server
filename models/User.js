var mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

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
    },
    googleId: {
        type: String
    },
    secret: {
        type: String
    },
    picture: {
        type: String
    }
})
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
