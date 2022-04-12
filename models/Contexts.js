var mongoose = require('mongoose');

const ContextSchema = new mongoose.Schema({
    context: { type: String, },
    timestamp: {
        type: Date, 
        default: Date.now()
    },
    condition: { type: Object, },
    info: { type: String, },
    user: { type: String, },
    description: { type: String },
    scope: { type: Number },
    subscribers: { type: Number }
})

const Context = mongoose.model("Context", ContextSchema, "contexts");

module.exports = Context;