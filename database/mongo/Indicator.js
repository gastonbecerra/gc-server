var mongoose = require('mongoose');

const IndicatorSchema = new mongoose.Schema({
   name:String,
   description:String,
   variables: [mongoose.Schema.Types.ObjectId],
   formula: String,
   module: [mongoose.Schema.Types.ObjectId],
   display_type: String
});

const Indicator = mongoose.model('Indicator', IndicatorSchema);

module.exports = Indicator;