var moongose = require('mongoose');

const ContextSchema = new moongose.Mongoose.Schema({
    name : {
        type: String
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

const Context = mongoose.model('Context', ContextSchema);

module.exports = Context;