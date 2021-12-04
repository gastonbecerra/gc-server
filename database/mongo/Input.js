var mongoose = require('mongoose');

const InputSchema = new mongoose.Schema({
   name: String,
   value: String,
   user: String,
   timestamp: {
       type: Date,
       default: Date.now()
   }
});

const Input = mongoose.model('Input', InputSchema);

module.exports = Input;