var express = require('express');
var indicatorRouter = express.Router();
var Indicator = require('../models/Indicators');
var Var = require('../models/Vars')
var Values = require('../models/Values')
var Samples = require('../models/Samples')

// GET INDICATORS BY MODULE

indicatorRouter.get('/:module', async(req, res) =>{
    var response = await Indicator.find({ module: req.params.module })
    res.send(response) 
})

// GET DATA FOR CHART BY INDICATOR, USER, SAMPLE

indicatorRouter.get('/:indicator/:context/:user', async(req, res) =>{
    
    // 1) traer info del indicador: fórmula y variables requeridas

    const indicator = await Indicator.findOne({ indicator: req.params.indicator })
    const formula = indicator.vars;

    // 2) parseamos la formula para saber cuál es la variable y cuáles son los inputs

    var inputs = [];
    var variable = "";
    var variable_compleja = false;
    if ( formula.includes(" = ") ) {       // si hay un "=" es porque la variable se calcula automáticamente, en cuyo caso, los inputs que ingresa el usuario vienen despues de " = "
        variable_compleja = true;       
        variable = formula.substring(0 , formula.indexOf(' = '))    // esta es la variable que se calcula automáticamente (sobre esta variable se hace el grafico)
        formula.substring(formula.indexOf(' = ') + 3).split(" ").forEach((e)=>{     // estos son los inputs del usuario (con los que se calcula el valor del usuario)
            if(e.length > 2){
                inputs.push(e)
            } 
        })    
    } else { 
        variable_compleja = false;
        variable = formula;       // no hay variable automática (la variable es un input)
        inputs = [formula];
    }

    // 3) busco info de la variable y los inputs ... no se muy bien para qué...

    var variable_info = await Var.find( { var: variable } );
    var inputs_info = await Var.find(
        { var: { $in: inputs } }
    )

    var variables = {
        "variable_compleja" : variable_compleja, 
        "variable" : variable_info,
        "inputs" : inputs_info,
    };

    // 4) traemos los valores del usuario (inputs)

    var vals =  await Values.find(        
            { $and: [
                {var: { $in: inputs }},     
                {user: req.params.user}    
            ] }
    )

    // 5) traemos la info de la muestra para ese contexto/indicador

    var sample = await Samples.find({
        $and: [
                {indicator: req.params.indicator}, 
                {context: req.params.context}
            ]
    })            

    res.json({indicator, variables, vals, sample})

})

module.exports = indicatorRouter;