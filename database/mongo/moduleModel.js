var mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    mods:{type: Array},
});

module.exports = mongoose.model('modules', moduleSchema);