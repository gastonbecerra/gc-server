var express = require('express');
var inputRouter = express.Router();
var InputController = require('../controller/inputController');
const inputModel = require('../database/mongo/inputModel');
var controller = new InputController();

inputRouter.get('/', async (req,res) => {
    res.json(await controller.getInput())
})

inputRouter.get('/:variable/:id_user', async (req,res)=>{
    var some = await inputModel.
        find({
            variable: req.params.variable,
            user:req.params.id_user,
        })
        res.send(some)
})

module.exports =  inputRouter;