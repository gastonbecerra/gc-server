var mongoose = require('mongoose');

const indicatorSchema = new mongoose.Schema({
    name:  String,
    formula: String,
    description: String
});

module.exports = mongoose.model('indicators', indicatorSchema);