var mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    /* 
    contexts []
    indicators[]
    ...
    */
});

module.exports = mongoose.model('users', userSchema);