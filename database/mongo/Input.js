var mongoose = require('mongoose');

const InputSchema = new mongoose.Schema({
   name:String,
   value: String,
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   },
   timestamp: {
       type: Date,
       default: Date.now()
   }
});

const Input = mongoose.model('Input', InputSchema);

module.exports = Input;