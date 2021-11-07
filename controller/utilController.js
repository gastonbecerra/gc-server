var express = require('express');
var inputRouter = express.Router();
var inputModel = require('../database/mongo/inputModel');
var User = require('../database/mongo/userModel');

//GET ALL INPUTS BY USER AND VARIABLE NAMES
// id => user_id
// [] => variables requested

async function getinputsByUserAndVariables(id,inputs){
    var res = await inputModel.find({
        user: id,
        variable: {$in: inputs}
    })
    return res;
}

module.exports = {getinputsByUserAndVariables}