var mongoose = require('mongoose');
var Indicator = require('./Indicator');

const ModuleSchema = new mongoose.Schema({
   title:String,
   text:String,
   indicators: {
      type:[mongoose.Schema.Types.ObjectId],
      ref: 'Indicator'
   },
});

const Module =  mongoose.model('modules', ModuleSchema);

module.exports = Module;