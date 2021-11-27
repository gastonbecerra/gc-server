var mongoose = require('mongoose');

const VariableSchema = new mongoose.Schema({
   name: String,
   description: String,
   value_type: String
});

const Variable = mongoose.model('variables', VariableSchema);

module.exports = Variable;