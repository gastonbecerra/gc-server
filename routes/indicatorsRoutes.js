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

    // 4) traemos los valores del usuario (inputs) asociados al indicador
    
    var values =  await Values.find(        
            { $and: [
                {var: { $in: inputs } },     
                {user: req.params.user}    
            ] }
    )
    values.length === 0 ? values = false : null;

    // 4.b ) cruzamos datos entre variables requeridas y variables existentes para el usuario
    
    let inputs_front = []; 
    
    function transporter(child, parent){
        if(child && parent){
        var matches = [];
        var index = 0;
        var child = child;   
        var parent = parent;
        var childIndex = child.length;
        var holder = []

        try {
            while( matches.length < parent.length){                    
                var flag = parent[index];
                for(var i = 0; i < child.length; i++ ){
                if(flag.var === child[i].var){                                       
                    !matches.includes(flag.var) 
                        &&  
                        holder.push({
                            processed: true,
                            _id: child[i]._id, 
                            value: child[i].value, 
                            user: child[i].user,
                            timestamp: child[i].timestamp && child[i].timestamp,
                            type:flag.type,
                            validation:flag.validation,
                            ux_input: flag.ux_input,
                            var: flag.var,
                            description: flag.description,
                            measurement: flag.measurement
                        })
                        matches.push(flag.var);
                        index ++;
                        }else{
                            childIndex --
                        }
                                            
                if(childIndex < 0){
                    // console.log(27, flag.var)
                    !matches.includes(flag.var) &&  
                    holder.push({
                        processed: true,
                        type:flag.type,
                        validation:flag.validation,
                        ux_input: flag.ux_input,
                        var: flag.var,
                        description: flag.description,
                        measurement: flag.measurement
                    })
                    matches.push(flag.var);
                    index ++;
                    childIndex = child.length;
                }
            }
        }  
        return holder;
        
        }catch(error){
            return holder;
        }
        
        }else if(!values){
            inputs_front = inputs_info;
        }   
    }

    inputs_front = transporter(values, inputs_info);

    // 4.c ) Traemos el valor para el indicador del usuario
    // precisar si es o no variable compleja
    var user_value = await Values.find({
        $and: [
            {var: req.params.indicator},
            {user: req.params.user}
        ]
    })
    user_value.length === 0 ? user_value = false : null;
    // variable_compleja ? user_value = {...user_value, dependencies: inputs_info} : user_value.dependencies = {...user_value[0], dependencies: false};

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
    },
        {
        "_id": "61c2a647bdedfb648b771ba9",
        "type": "int",
        "ux_input": "",
        "validation": "",
        "var": "ingresos",
        "description": "xxx",
        "measurement": "currency"
        "TIMESTAMP": "2021-12-01T03:00:00.000Z",
        "USER": 'Gastón' / FALSE,
        "VALUE": 928272 / FALSE,
    }

],
    user_value: {
        ... / FALSE
        {}
    },
    sample: {
        ... / FALSE
    }    
*/
