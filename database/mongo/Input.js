var mongoose = require('mongoose');

const InputSchema = new mongoose.Schema({
   name:String,
   value_type: String,
   value: String,
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   }
});

const Input = mongoose.model('Input', InputSchema);

module.exports = Input;