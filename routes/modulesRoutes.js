var express = require('express');
var moduleRouter = express.Router();
var Module = require('../database/mongo/moduleModel')

var ModuleController = require('../controller/moduleController');
var controller = new ModuleController();

//GET ALL MODULES FROM MONGO
moduleRouter.get('/', async (req,res) => {
    res.send(await controller.getModules())
})

moduleRouter.get('/mindicators', async (req,res) => {
    var results = await Module.find({})
    .populate('indicators')
    res.send(results)
})


module.exports =  moduleRouter;