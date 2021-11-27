var express = require('express');
var inputRouter = express.Router();
var Input = require('../database/mongo/Input');
var User = require('../database/mongo/User');
var Indicator = require('../database/mongo/Indicator');
var Sample = require('../database/mongo/Sample');
var UserIndicator = require('../database/mongo/UserIndicator');
var Variable = require('../database/mongo/Variable')

inputRouter.get('/full/:indicator_id/:context_id/:user_id', async (req,res)=>{
    // 1) traer de mongo info del indicador: fórmula y variables requeridas
    const indicator = await Indicator.findOne({ _id: req.params.indicator_id }).populate({path: 'variables', model: Variable});
  
    var { variables } = indicator;
    var vars = []
    variables.forEach((v)=> vars.push(v.name))
    
    // 2) traer  inputs del usuario asociados al indicador
    var user_inputs = await Input.find({
        $and: [
        {name: { $in: vars }},
        {user: req.params.user_id}
        ]
    })
    user_inputs.length === 0 ? user_inputs = false : null;

    // 3) identificar, en caso que haya, los inputs faltantes para el usuario
    let user_inputs_required;
    var uvars = [];
    
    user_inputs === false ? user_inputs_required = variables : null;
    user_inputs !== false ? user_inputs.forEach((v) => uvars.push(v.name)) : null;
    user_inputs !== false ? user_inputs_required = vars.filter(x => !uvars.includes(x)) : null;

    inputs_required = await Variable.find({
        name:  {$in: user_inputs === false ? vars : user_inputs_required } 
    })
    inputs_required.length === 0 ? inputs_required = false : null;

    // 4) traer de mongo la muestra del indicador y contexto seleccionado
    var sample = await Sample.find({
            $and: [
                {indicator: req.params.indicator_id},
                {contexto: req.params.context_id}
            ]
    })
    
    sample.length === 0 ? sample = false : null;
    
    // 5) traer de mongo el valor de indicador para usuario
    var user_value = await UserIndicator.find({
            user: req.params.user_id,
            indicator: req.params.indicator_id,
        })
        user_value.length === 0 ? user_value = false : null;
        
    let user_data = {
        inputs: user_inputs,
        inputs_required,
        user_value
    }
    
    res.json({indicator, user_data, sample})
});

inputRouter.post('/', (req, res)=>{
    const {name, variable, value, user} = req.body;
    const newInput = new Input({
        name, 
        variable, 
        value, 
        user
    })
    newInput.save()
    .then((input)=>{
        res.json(true)
    })
    .catch(err =>{
        res.send(false)
    })
})


// POPULATING EXAMPLES
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



