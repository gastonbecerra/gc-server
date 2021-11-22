var mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
   title:String,
   text:String,
   indicators : {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'indicators'
   }
});

const Module = mongoose.model('modules', moduleSchema);
module.exports = Module;