var mongoose = require('mongoose');

const contextSchema = new mongoose.Schema({
    contexts:{type: Array},
});

module.exports = mongoose.model('contexts', contextSchema);