var express = require('express');
var moduleRouter = express.Router();
var Module = require('../database/mongo/Module')


moduleRouter.get('/mindicators', async (req,res) => {
    var results = await Module.find({})
    .populate('indicators')
    res.send(results)
})

module.exports =  moduleRouter;