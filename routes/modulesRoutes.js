
var express = require('express');
var app = express();
var moduleRouter = express.Router();
var basicModules = require('../database/basicModules');
var ModuleController = require('../controller/moduleController');

var controller = new ModuleController();

//GET ALL BASICS MODULES
moduleRouter.get('/basics', (req, res )=>{
    res.send(basicModules)
})

//GET ALL MODULES FROM MONGO
moduleRouter.get('/api/basics', async (req,res) => {
    res.send(await controller.getModules())
})


module.exports =  moduleRouter;