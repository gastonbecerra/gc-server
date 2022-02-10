var mongoose = require('mongoose');

const ValueSchema = new mongoose.Schema({
    var: { type: String },
    value: { 
        type: mongoose.Schema.Types.Mixed
    },
    user: { type: String },
    timestamp: {
        type: Date, 
        default: Date.now()
    }
})

const Values = mongoose.model("Value", ValueSchema, "values");

module.exports = Values;