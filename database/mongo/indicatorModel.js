var mongoose = require('mongoose');

const indicatorSchema = new mongoose.Schema({
    name:  String,
    formula: Array,
    description: String,
    module: String
});

module.exports = mongoose.model('indicators', indicatorSchema);