
var express = require('express');
var app = express();
var moduleRouter = express.Router();
var basicModules = require('../database/basicModules');

//GET ALL BASICS MODULES
moduleRouter.get('/basics', (req, res )=>{
    res.send(basicModules)
})


module.exports =  moduleRouter;