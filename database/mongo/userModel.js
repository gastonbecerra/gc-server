var mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    type: String
    /* 
    contexts []
    indicators[]
    context: ['Macristas', 'Kirchneristas', 'Cordobeses']
    ...
    */
});

module.exports = mongoose.model('users', userSchema);
