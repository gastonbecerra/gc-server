var mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    type: { type: String, },
    ref_id: {},
    data: {},
    user: { type: String },
    timestamp: {type: Date, default: Date.now()},
    commnents: { }
})

const Context = mongoose.model("Event", EventSchema, "events");

module.exports = Context;