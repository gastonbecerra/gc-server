var mongoose = require('mongoose');

const IndicatorSchema = new mongoose.Schema({
    indicator: { type: String, },
    description: { type: String, },
    analysis: { type: String, },
    chart: { type: String, },
    module: { type: String, },
    vars: { type: String, },
    timestamp: {
        type: Date, 
        default: Date.now()
    }
})

const Indicator = mongoose.model("Indicator", IndicatorSchema, "indicators");

module.exports = Indicator;