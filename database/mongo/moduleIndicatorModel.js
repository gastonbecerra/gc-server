var mongoose = require('mongoose');
var Modules = require('./moduleModel');
var Indicators = require('./indicatorModel');

const moduleIndicatorSchema = mongoose.Schema({
    module: {
        type: mongoose.Schema.ObjectId, 
        ref: Modules
    },
    indicator:{
        type: mongoose.Schema.ObjectId,
        ref: Indicators
    } 
});

module.exports = mongoose.model('module-indicators', moduleIndicatorSchema);
