var mongoose = require('mongoose');

const indicatorSchema = new mongoose.Schema({
    name: {type: String},
    indicadores:{type: Array}
});

module.exports = mongoose.model('indicators', indicatorSchema);