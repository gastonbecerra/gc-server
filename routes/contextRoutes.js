
var express = require('express');
var contextRouter = express.Router();
var basicContexts = require('../database/basicContexts');

//GET ALL BASICS CONTEXTS
contextRouter.get('/basics', function(req,res){
    res.send(basicContexts)
})


module.exports =  contextRouter;