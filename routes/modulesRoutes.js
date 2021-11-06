var express = require('express');
var moduleRouter = express.Router();
var basicModules = require('../database/basicModules');
var ModuleController = require('../controller/moduleController');
var moduleIndicatorModel = require('../database/mongo/moduleIndicatorModel');
var controller = new ModuleController();
var indicatorModel = require('../database/mongo/indicatorModel');

//GET ALL BASICS MODULES
moduleRouter.get('/basics', (req, res )=>{
    res.send(basicModules)
})

//GET ALL MODULES FROM MONGO
moduleRouter.get('/api/basics', async (req,res) => {
    res.send(await controller.getModules())
})

moduleRouter.get('/modulo/:id_modulo', async (req,res)=>{
    // 1 traer título y texto del modulo x id
    
    // 2 traer listado de indicadores asociados al id del módulo 
    var listIndicators = await moduleIndicatorModel.find({'module': req.params.id_modulo})
    
    var list = [] 
    listIndicators.forEach(async (i)=>{
        list.push(i.indicator)
    })

    const records = await indicatorModel.find().where('_id').in(list).exec();

    res.send(records)

})

module.exports =  moduleRouter;