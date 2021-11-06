var mongoose = require('mongoose')

const moduleIndicatorSchema = mongoose.Schema({
    module: String,
    indicator: String,
});

module.exports = mongoose.model('module-indicators', moduleIndicatorSchema);
