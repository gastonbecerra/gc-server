var mongoose = require('mongoose');
var UserIndicator = require('./UserIndicator')
const UserSchema = new mongoose.Schema({
   username: {
    type: String,
    unique: true,
    required: true,
    validate: {
        validator: (username) => username.length > 2,
        message: "Name not long enough"
    }
   },
   password:String,
   inputs: [{
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'Input'
    }],
    userindicators: {
       type:[mongoose.Schema.Types.ObjectId],
       ref: 'UserIndicator'
   },
   timestamp: {
       type: Date,
       default: new Date()
   }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;