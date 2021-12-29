var express = require('express');
var indicatorRouter = express.Router();
var Indicator = require('../models/Indicators');
var Var = require('../models/Vars')
var Values = require('../models/Values')
var Samples = require('../models/Samples')

// GET ALL INDICATORS 

indicatorRouter.get('/', async (req, res) =>{
    var response = await Indicator.find({ })
    res.send(response) 
})


// GET INDICATORS BY MODULE

indicatorRouter.get('/:module', async (req, res) =>{
    var response = await Indicator.find({ module: req.params.module })
    res.send(response) 
})

// GET DATA FOR CHART BY INDICATOR, USER, SAMPLE

indicatorRouter.get('/:indicator/:context/:user', async (req, res) =>{
    
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

    // 3) busco info de la variable y los inputs ... no se muy bien para qué... // JP: Sirve para tener los datos de UX_TYPE para front

    var variable_info = await Var.find( { 
        var: variable 
    } );

    var inputs_info = await Var.find(
        { var: { $in: inputs } }
    )

    // 4) traemos los valores del usuario (inputs)
    
    var values =  await Values.find(        
            { $and: [
                {var: { $in: inputs } },     
                {user: req.params.user}    
            ] }
    )
    values.length === 0 ? values = false : null;

    // 4.b ) cruzamos datos entre variables requeridas y variables existentes para el usuario
    
    var inputs_front = [];
    
    if(values && inputs_info){
        var procesedProps = [];
        for(let y = 0 ; y < inputs_info.length; y++){            
                for(let z = 0; z < values.length; z++){
                    if(inputs_info[y].var == values[z].var && !procesedProps.includes(inputs_info[y].var)){
                        if(!procesedProps.includes(inputs_info[y].var)){
                            inputs_front.push({
                                processed: true,
                                _id: values[z]._id, 
                                value: values[z].value, 
                                user: values[z].user,
                                timestamp: values[z].timestamp,
                                type:inputs_info[y].type,
                                validation:inputs_info[y].validation,
                                ux_type:inputs_info[y].ux_type ? inputs_info[y].ux_type : 'undefined',
                                var: inputs_info[y].var,
                                description: inputs_info[y].description,
                                measurement: inputs_info[y].measurement
                            })
                        }
                        procesedProps.push(inputs_info[y].var);
                      break;
                    }else{                        
                        if(!procesedProps.includes(inputs_info[y].var)){
                            inputs_front.push(inputs_info[y])
                            procesedProps.push(inputs_info[y].var)
                        }
                    }
                  }
            
            
            console.log(procesedProps)
        }
    }else if(!values){
        inputs_front = inputs_info;
    }

    // 4.c ) Traemos el valor para el indicador del usuario
    // precisar si es o no variable compleja
    var user_value = await Values.find({
        $and: [
            {var: req.params.indicator},
            {user: req.params.user}
        ]
    })
    user_value.length === 0 ? user_value = false : null;


    // 5) traemos la info de la muestra para ese contexto/indicador

    var sample = await Samples.find({
        $and: [
                {indicator: req.params.indicator}, 
                {context: req.params.context}
            ]
    })            
    sample.length === 0 ? sample = false : null;

    res.json({inputs_front, sample, user_value})

})

module.exports = indicatorRouter;

/*
    variables: [
    {
        "_id": "61c2a647bdedfb648b771ba9",
        "type": "int",
        "ux_input": "",
        "validation": "",
        "var": "ahorro",
        "description": "xxx",
        "measurement": "currency"
        "TIMESTAMP": "2021-12-01T03:00:00.000Z",
        "USER": 'Gastón' / FALSE,
        "VALUE": 928272 / FALSE,
    }],
    user_value: {
        ... / FALSE
    },
    sample: {
        ... / FALSE
    }
    
*/