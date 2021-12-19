var mongoose = require('mongoose');

const UserIndicatorSchema = new mongoose.Schema({
   name: String, 
   observable: String,
   value: String,
   user: String,
   indicator: String,
   timestamp: {
       type: Date,
       default: Date.now()
   }
});

const UserIndicator = mongoose.model('UserIndicator', UserIndicatorSchema);

module.exports = UserIndicator;