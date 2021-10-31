var mongoose = require('mongoose');

const schema = mongoose.Schema({
    context:{type: Array},
});

const contexts = mongoose.model('contexts', schema);

module.exports = contexts;