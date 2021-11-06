var mongoose = require('mongoose');

const contextSchema = new mongoose.Schema({
    name: String,
    created: Date
});

module.exports = mongoose.model('contexts', contextSchema);