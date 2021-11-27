var mongoose = require('mongoose');

const IndicatorSchema = new mongoose.Schema({
   name:String,
   description:String,
   variables: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Variable'
   },
   formula: String,
   module: {
      type:[mongoose.Schema.Types.ObjectId],
      ref: 'Module'
   },
   display_type: String,
   documentation: String
});

const Indicator = mongoose.model('Indicator', IndicatorSchema);

module.exports = Indicator;