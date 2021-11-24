var mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    type: String,
    inputs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'inputs'
    }
});

module.exports = mongoose.model('users', userSchema);
