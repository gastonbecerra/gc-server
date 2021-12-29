var express = require('express');
var moduleRouter = express.Router();
var Module = require('../models/Modules');
var Indicator = require('../models/Indicators');

//GET ALL MODELS WITH INDICATORS POPULATED

moduleRouter.get('', async (req,res) => {
    var results = await Module.find({})
    .populate('indicators')
    res.send(results)
})

module.exports = moduleRouter;