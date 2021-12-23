var mongoose = require('mongoose');

const ContextSchema = new mongoose.Schema({
    context: { type: String, },
    timestamp: {
        type: Date, 
        default: Date.now()
    }
})

const Context = mongoose.model("Context", ContextSchema, "contexts");

module.exports = Context;