var express = require('express');
var sampleRouter = express.Router();
var SampleController = require('../controller/sampleController');
var controller = new SampleController();

sampleRouter.get('/', async (req, res)=>{
    res.json(await controller.getSamples())
})

sampleRouter.get('/:id/:context', async (req,res)=>{
    // T2 VALIDACION
    res.json(await controller.getByIndicatorAndContext(req.params.id, req.params.context))
})

sampleRouter.post('/', (req,res)=>{
    
})

sampleRouter.delete('/:id', (req,res)=>{
    
})

module.exports = sampleRouter;