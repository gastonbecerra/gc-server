var express = require('express');
var inputRouter = express.Router();
var InputController = require('../controller/inputController');
const Input = require('../database/mongo/inputModel');
var controller = new InputController();

inputRouter.get('/', async (req,res) => {
    res.json(await controller.getInput())
})

inputRouter.get('/:variable/:id_user', async (req,res)=>{
    var some = await Input.
        find({
            variable: req.params.variable,
            user:req.params.id_user,
        })
        res.send(some)
})

inputRouter.post('/', (req, res)=>{
    // console.log(req.body);
    const {value, variable, user, timestamp} = req.body;
    const newInput = new Input({
        value, 
        variable, 
        user, 
        timestamp
    })
    newInput.save()
    .then((input)=>{
        res.json(true)
    })
    .catch(err =>{
        res.send(false)
    })
})

module.exports =  inputRouter;