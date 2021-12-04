var mongoose = require('mongoose');

const IndicatorSchema = new mongoose.Schema({
   name: String,
   description: String,
   formula: Array,   
   module: String,
   display_type: String,
   documentation: String
});

const Indicator = mongoose.model('Indicator', IndicatorSchema);

module.exports = Indicator; 