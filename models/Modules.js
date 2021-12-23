var mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    module: { type: String, },
    description: { type: String, },
    timestamp: {
        type: Date, 
        default: Date.now()
    }
})

const Module = mongoose.model("Module", ModuleSchema, "modules");

module.exports = Module;