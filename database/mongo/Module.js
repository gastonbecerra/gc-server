var mongoose = require('mongoose');
var Indicator = require('./Indicator');

const ModuleSchema = new mongoose.Schema({
   title:String,
   text:String,
   indicators: [mongoose.Schema.Types.ObjectId],
});

const Module =  mongoose.model('modules', ModuleSchema);

module.exports = Module;