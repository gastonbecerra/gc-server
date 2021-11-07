var mongoose = require('mongoose');
var User = require('./userModel');

const inputSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: User
    }, 
    variable: String,
    value: String,
    timestamp: Date
})

module.exports = mongoose.model('inputs', inputSchema);