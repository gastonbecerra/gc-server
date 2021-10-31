
var express = require('express');
var indicatorRouter = express.Router();
var {financieros, sexAppeal, modulo3} = require('../database/basicIndicators')

//GET BASIC INDICATORS BY ID
indicatorRouter.get('/basics/:id', function(req,res){
    req.params.id == 0 ? res.send(financieros) : null
    req.params.id == 1 ? res.send(sexAppeal) : null
    req.params.id == 2 ? res.send(modulo3) : null
})


module.exports =  indicatorRouter;