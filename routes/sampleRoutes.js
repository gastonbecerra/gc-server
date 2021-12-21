var express = require('express');
var sampleRouter = express.Router();
var Sample = require('../models/Samples');

// GET SAMPLE BY INDICATOR AND CONTEXT
sampleRouter.get('/:indicator/:context', async(req, res) =>{
    var response = await Sample.find({
        $and: [
            {indicator: req.params.indicator},
            {context: req.params.context}
        ]
    })
    res.send(response) 
})

// GET ALL SAMPLES 
sampleRouter.get('/all', async(req, res) =>{
    res.json(await Sample.find()) 
})

// GET SAMPLE BY ID 
sampleRouter.get('/id', async(req, res) =>{
    res.json(await Sample.findOne({_id: "61aac348de460000b5003645"}))
})

module.exports = sampleRouter;