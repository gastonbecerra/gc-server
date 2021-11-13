var mongoose = require('mongoose')

const userIndicatorSchema = mongoose.Schema({
    user: String,
    indicador: String,
    valor: String
});

const UserIndicator =  mongoose.model('user-indicator', userIndicatorSchema);

module.exports = UserIndicator;