var mongoose = require('mongoose');

const SampleSchema = new mongoose.Schema({
    indicator: {
        type: String,
    },
    context: {
        type: String,
    },
    values: {},
})

// const Sample = mongoose.model('sample', SampleSchema);
const Sample = mongoose.model("Sample", SampleSchema, "samples");

module.exports = Sample;