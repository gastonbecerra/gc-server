var mongoose = require('mongoose');
var Module = require('./Module');
var Variable = require('./Variable');

const IndicatorSchema = new mongoose.Schema({
   name:String,
   description:String,
   required_variables: [mongoose.Schema.Types.ObjectId],
   formula: String,
   module: [mongoose.Schema.Types.ObjectId],
   display_type: String
});

const Indicator = mongoose.model('indicators', IndicatorSchema);

module.exports = Indicator;