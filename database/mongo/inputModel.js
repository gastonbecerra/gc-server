var mongoose = require('mongoose');

const inputSchema = mongoose.Schema({
    user: String,
    variable: String,
    value: String,
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

const Input = mongoose.model('inputs', inputSchema);

module.exports = Input;