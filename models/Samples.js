var mongoose = require('mongoose');

const SampleSchema = new mongoose.Schema({
    indicator: { type: String, },
    context: { 
        type: String 
    },
    values: {},
    info: { type: String }, 
    timestamp: {
        type: Date, 
        default: Date.now()
    }
})

// const Sample = mongoose.model('sample', SampleSchema);
const Sample = mongoose.model("Sample", SampleSchema, "samples");

module.exports = Sample;