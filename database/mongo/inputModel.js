var mongoose = require('mongoose');

const inputSchema = mongoose.Schema({
    user: String,
    variable: String,
    value: String,
    timestamp: Date
})

module.exports = mongoose.model('inputs', inputSchema);