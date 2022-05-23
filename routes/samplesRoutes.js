var express = require('express');
var sampleRouter = express.Router();
var Sample = require('../models/Samples');


// GET ALL SAMPLES FOR SUBSCRIBED AND CREATED USER'S CONTEXTS 
sampleRouter.post('/contexts', async (req, res) =>{
    var response = await Sample.find({"context": {$in: req.body}})
    
    response.legth <= 0 ? 
    res.status(412).send({
        message: ' no samples founded '
    })
    :
    res.send(response)
})

// GET SAMPLE BY  CONTEXT
sampleRouter.get('/:context', async (req, res) =>{
    
    var response = await Sample.find({
        context: req.params.context
    })
    
    response.legth <= 0 ? 
    res.status(412).send({
        message: ' no samples founded '
    })
    :
    res.send(response)
})

// GET SAMPLES BY CONTEXTS FOR USER
// sampleRouter.get('/:contexts', async (req, res)=>{

//     var response = await Sample.find({
//         context: {$in: req.params.contexts}
//     })

//     response.length === 0 ? response = false : null;

//     response ? 
//         res.status(412).send({
//             message: ' no samples founded '
//         })
//     :
//         res.send(response)
// })

// GET SAMPLE BY INDICATOR AND CONTEXT
sampleRouter.get('/:indicator/:context', async (req, res) =>{
    var response = await Sample.find({
        $and: [
            {indicator: req.params.indicator},
            {context: req.params.context}
        ]
    })
    res.send(response) 
})




module.exports = sampleRouter;