var mongoose = require('mongoose');

const VarSchema = new mongoose.Schema({
    description: { type: String, },
    type: { type: String },
    ux_input: { type: String, },
    validation: { type: String, },
    measurement: { type: String, },
    var: { type: String },
    timestamp: {
        type: Date, 
        default: Date.now()
    }
})

const Var = mongoose.model("Var", VarSchema, "vars");

module.exports = Var;