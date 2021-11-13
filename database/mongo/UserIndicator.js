var mongoose = require('mongoose');

const UserIndicatorSchema = new mongoose.Schema({
   name:String,
   inputs: {
       type: [mongoose.Schema.Types.ObjectId],
       ref: 'Input'
   },
   value: String,
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   }
});

const UserIndicator = mongoose.model('UserIndicator', UserIndicatorSchema);

module.exports = UserIndicator;