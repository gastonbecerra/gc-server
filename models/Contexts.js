var mongoose = require('mongoose');

const ContextSchema = new mongoose.Schema({
    context: { type: String, },
    timestamp: {
        type: Date, 
        default: Date.now()
    },
    condition: { type: Object, },
    info: { type: String, },
    user: { type: String, }
})

const Context = mongoose.model("Context", ContextSchema, "contexts");

module.exports = Context;