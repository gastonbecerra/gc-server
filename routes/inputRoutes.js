var express = require('express');
var inputRouter = express.Router();
var Input = require('../database/mongo/Input');
var User = require('../database/mongo/User');

//GET INPUTS BY USERS ID and INPUTS NAMES
var inputs = ['ingreso', 'gastos']
var id = '6185c7cf68d6c5cf24be977e'

let joe, input;

inputRouter.get('/', (req,res)=>{
    joe = new User({username: 'JoeB'})
    
    input = new Input({name: 'ingreso', value: 12})

    joe.inputs.push(input);
    input.user = joe;

    Promise.all([
        joe.save(),
        input.save()])
    .then((results)=> 
        res.json(results));
});

inputRouter.get('/populated', async (req,res)=>{
    var results = await User.find({username: 'JoeB'})
    .populate('userindicators')
    res.json(results)
});

inputRouter.get('/fullpopulated', async (req,res)=>{
    var results = await User.find({username: 'JoeB'})
    .populate({
        path: 'userindicators',
        populate:{
            path: 'inputs',
            populate:{
                path: 'user'
            }
        }
    })
    res.json(results)
});

module.exports = inputRouter;



