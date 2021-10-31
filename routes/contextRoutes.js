
var express = require('express');
var contextRouter = express.Router();
var basicContexts = require('../database/basicContexts');
var ContextController = require('../controller/contextController')
var controller = new ContextController();

//GET ALL BASICS CONTEXTS
contextRouter.get('/basics', function(req,res){
    res.send(basicContexts)
})

//GET CONTEXTS FROM MONGO
contextRouter.get('/api/basics', function(req,res){
    res.send(basicContexts)
})




module.exports =  contextRouter;