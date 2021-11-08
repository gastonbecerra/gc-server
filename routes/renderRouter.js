var express = require('express');
var renderRouter = express.Router();
var Indicador = require('../database/mongo/Indicator');
var Module = require('../database/mongo/Module');

/* 
URL: /modules
METHOD: GET
DATA: modules = [{text, title, indicators}]
FRONT: <Dashboard/> on "/"
*/
renderRouter.get('/modules', async (req,res)=>{
    res.send(await Module.find())
})


module.exports =  renderRouter;
