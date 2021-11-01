
var express = require('express');
var indicatorRouter = express.Router();
var {financieros, sexAppeal, modulo3} = require('../database/basicIndicators')
var IndicatorController = require('../controller/indicatorController')
var controller = new IndicatorController();

//GET BASIC INDICATORS BY ID
indicatorRouter.get('/basics/:id', function(req,res){
    req.params.id == '61803b098d4b26307ac61c71' ? res.send(financieros) : null
    req.params.id == '61803c788d4b26307ac61c72' ? res.send(sexAppeal) : null
    req.params.id == '618042138d4b26307ac61c73' ? res.send(modulo3) : null
})

//GET CONTEXTS FROM MONGO
indicatorRouter.get('/api/basics', async (req,res) => {
    res.json(await controller.getIndicators())
})

//GET BASIC INDICATORS BY ID FROM MONGO
indicatorRouter.get('/api/basics/:id', async (req,res)=>{
    res.json(await controller.getIndicatorById(req.params.id))
})


module.exports =  indicatorRouter;