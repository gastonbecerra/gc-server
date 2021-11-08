var express = require('express');
var moduleRouter = express.Router();


var ModuleController = require('../controller/moduleController');
var controller = new ModuleController();
var indicatorModel = require('../database/mongo/indicatorModel');

//GET ALL MODULES FROM MONGO
moduleRouter.get('/', async (req,res) => {
    res.send(await controller.getModules())
})

moduleRouter.get('/:id_modulo', async (req,res)=>{
    const records = await indicatorModel.find().where('module').in(req.params.id_modulo).exec();
    res.send(records)
})

module.exports =  moduleRouter;