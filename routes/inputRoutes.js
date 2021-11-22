var express = require('express');
var inputRouter = express.Router();
var Input = require('../database/mongo/Input');
var User = require('../database/mongo/User');
var Indicator = require('../database/mongo/Indicator');
var Sample = require('../database/mongo/Sample');
var UserIndicator = require('../database/mongo/UserIndicator');

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

inputRouter.get('/full/:id_indicator/:id_user/:id_context', async (req,res)=>{
    // 1) traer de mongo info del indicador: fórmula y variables requeridas
    var indicator = await Indicator.findById({_id: req.params.id_indicator})
    var {variables: required_variables, id, name, description, formula, module, display_type, variables } = indicator;

    // 2) traer de mongo inputs del usuario asociados al indicador
    var user_inputs = await Input.find({
        type: { $in: required_variables },
        user: req.params.id_user
    })
    user_inputs.length === 0 ? user_inputs = false : null;
    var user_inputs_required;
    user_inputs === false ? user_inputs_required = required_variables : user_inputs_required = required_variables.filter(x => user_inputs.includes(x))
    
    // 3) traer de mongo la muestra del indicador 
    var sample = await Sample.find({
        indicator: req.params.id_indicator,
        context: req.params.id_context
    })
    sample.length === 0 ? sample = false : null;

    // 4) traer de mongo el valor de indicador para usuario
    var user_value = await UserIndicator.find({
        user: req.params.id_user,
        indicator: req.params.id_indicator,
    })
    user_value.length === 0 ? user_value = false : null;
    
    res.json(
        {
        indicator: 
            {id, name, description, formula, display_type, variables},
        inputs:{user_inputs,user_inputs_required },
        sample,
        user_value
        }
    )
});

module.exports = inputRouter;



