var mongoose = require('mongoose')

const sampleSchema = mongoose.Schema({
    type: String,
    value: Object,
    indicator: mongoose.Schema.Types.ObjectId,
    contexto: String
});

const Sample = mongoose.model('samples', sampleSchema);

module.exports = Sample;
