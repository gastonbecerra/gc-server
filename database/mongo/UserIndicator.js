var mongoose = require('mongoose');

const UserIndicatorSchema = new mongoose.Schema({
   name:String,
   value: String,
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   },
   indicator: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Indicator'
   },
   timestamp: {
       type: Date,
       default: Date.now()
   }
});

const UserIndicator = mongoose.model('UserIndicator', UserIndicatorSchema);

module.exports = UserIndicator;