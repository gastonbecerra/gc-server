var mongoose = require('mongoose');

const SampleSchema = new mongoose.Schema({
    indicator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Indicator'
    },
    contexto: {
        type: String,
    },
    values: {
        
    },
    type: String,
    name: String
})

const Sample = mongoose.model('Sample', SampleSchema);

module.exports = Sample;