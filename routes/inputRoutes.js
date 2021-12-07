var express = require('express');
var inputRouter = express.Router();
var Input = require('../database/mongo/Input');
var User = require('../database/mongo/User');
var Indicator = require('../database/mongo/Indicator');
var Sample = require('../database/mongo/Sample');
var UserIndicator = require('../database/mongo/UserIndicator');
var Variable = require('../database/mongo/Variable')
const Axios = require('axios');
const request = require('request');
const fetch = require('node-fetch');

inputRouter.get('/full/:indicator_id/:context_id/:user_id', async (req,res)=>{
    // 1) traer de mongo info del indicador: fórmula y variables requeridas
    const indicator = await Indicator.findOne({ _id: req.params.indicator_id })
    const formula = indicator.formula;
    var inputsExpresions = []
    
    formula.forEach((e)=>{
        if(e.tipo.substring(0,3) === 'var'){
            inputsExpresions.push(e.termino)
        }
    })
    
    // 2) traer  inputs del usuario asociados al indicador
    var user_inputs = await Input.find({
        $and: [
            {name: { $in: inputsExpresions }},
            {user: req.params.user_id}
        ]
    })
    user_inputs.length === 0 ? user_inputs = false : null;

    // 3) identificar, en caso que haya, los inputs faltantes para el usuario
    let user_inputs_required = [];
    var uvars = [];
    let vars = [];
    
    // si el usuario no tiene ningún input (user_inputs = false), entonces user_inouts_required es igual a las expresiones de inputs
    user_inputs === false ? user_inputs_required = inputsExpresions : null;
    user_inputs !== false ? user_inputs.forEach((v) => uvars.push(v.name)) : null;
    user_inputs !== false ? user_inputs_required = inputsExpresions.filter(x => !uvars.includes(x)) : null;
    
    inputs_required = await Variable.find({
            name:  {$in: user_inputs_required } 
        })
    inputs_required.length === 0 ? inputs_required = false : null;
        
    // 4) traer de mongo la muestra del indicador y contexto seleccionado
    var sample = await Sample.find({
        $and: [
                {name: indicator.name},
                {contexto: req.params.context_id}
            ]
    })            
    sample.length === 0 ? sample = false : null;
            
    // 5) traer de mongo el valor de indicador para usuario
    var user_value = await UserIndicator.find({
                user: req.params.user_id,
                indicator: indicator.name,
            })
            user_value.length === 0 ? user_value = false : null;
        
        let user_data = {
                inputs: user_inputs,
                inputs_required,
                user_value
            }
            
    res.json({indicator, user_data, sample})
            
});

inputRouter.post('/', async (req, res)=>{
    const {name, indicator, value, user} = req.body;
    
    const newInput = new Input({
        name, 
        value, 
        user
    })
    newInput.save()
    
    fetch(`https://stormy-citadel-88496.herokuapp.com/calculate/indicador-usuario?usuario=${user}&indicador=${indicator}`)
    .then(res => 
        res.json())
    .then(json => {
        res.send({status: true, msge: "user-indicator-created"})
    })
    .catch((err)=>{
        res.send({status: false, msge: "error-in-user-indicator-created"})
    })

})


//UPDATE INPUT
inputRouter.put('/:id', (req, res, next) => {
    Input.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data)
      }
    })
  })

//DELETE INPUT
inputRouter.delete('/:id', function (req, res) {
    var id = req.params.id;
  
    Input.deleteOne({ _id: id })
    .then((data)=>{
        res.json({msge: 'deleted', data})
    })
  });


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



// async function getUserIndicatorValue(user, indicator){
//     // console.log(user, indicator);
//     // const data = await Axios({
//     //     method: "GET",
//     //     withCredentials: true,
//     //     url: `https://stormy-citadel-88496.herokuapp.com/calculate/indicador-usuario?usuario=${user}&indicador=${indicator}`,
//     //   })
      
//     //   return data;
//     request(`https://stormy-citadel-88496.herokuapp.com/calculate/indicador-usuario?usuario=${user}&indicador=${indicator}`,  function (error, response, body){
//         if (!error && response.statusCode == 200) {
//             return JSON.parse(body)
//         }  
//     })
// }