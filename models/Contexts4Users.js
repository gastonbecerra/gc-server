var mongoose = require('mongoose');

const ContextSchema = new mongoose.Schema({
    context: { type: String, },
    user: { type: String, },
})

const Context4User = mongoose.model("Context4User", ContextSchema, "contexts4users"); // no tengo ni puta idea que esta pasando aca, pero se deberia poder saltear

module.exports = Context4User;