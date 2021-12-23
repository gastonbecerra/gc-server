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

module.exports = sampleRouter;