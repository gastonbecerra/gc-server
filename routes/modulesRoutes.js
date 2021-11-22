var express = require('express');
var moduleRouter = express.Router();
var Module = require('../database/mongo/moduleModel')

var ModuleController = require('../controller/moduleController');
var controller = new ModuleController();
var indicatorModel = require('../database/mongo/indicatorModel');

//GET ALL MODULES FROM MONGO
moduleRouter.get('/', async (req,res) => {
    res.send(await controller.getModules())
})

moduleRouter.get('/mindicators', async (req,res) => {
    var results = await Module.find({})
    .populate('indicators')
    res.send(results)
})

moduleRouter.get('/:id_modulo', async (req,res)=>{
    const records = await indicatorModel.find().where('module').in(req.params.id_modulo).exec();
    res.send(records)
})

module.exports =  moduleRouter;