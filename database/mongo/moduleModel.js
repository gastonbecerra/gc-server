var mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
   title:String,
   text:String
});

module.exports = mongoose.model('modules', moduleSchema);