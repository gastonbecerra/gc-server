
var express = require('express');
var indicatorRouter = express.Router();
var {financieros, sexAppeal, modulo3} = require('../database/basicIndicators')
var IndicatorController = require('../controller/indicatorController')
var controller = new IndicatorController();
var indicatorModel = require('../database/mongo/indicatorModel');
var inputModel = require('../database/mongo/inputModel');

//GET BASIC INDICATORS BY ID
indicatorRouter.get('/basics/:id', function(req,res){
    req.params.id == '61803b098d4b26307ac61c71' ? res.send(financieros) : null
    req.params.id == '61803c788d4b26307ac61c72' ? res.send(sexAppeal) : null
    req.params.id == '618042138d4b26307ac61c73' ? res.send(modulo3) : null
})

//GET CONTEXTS FROM MONGO
indicatorRouter.get('/api/basics', async (req,res) => {
    res.json(await controller.getIndicators())
})

//GET BASIC INDICATORS BY ID FROM MONGO
indicatorRouter.get('/api/basics/:id', async (req,res)=>{
    res.json(await controller.getIndicatorById(req.params.id))
})

indicatorRouter.get('/input/:id_indicador/:id_contexto/:id_usuario', async (req, res)=>{
    // res.send(req.params);
    const {id_indicador, id_contexto, id_usuario} = req.params;
    // res.send('estas bien')
    // res.json({id_indicador, id_contexto, id_usuario})
    //1 traer de mongo info del indicador: fórmula y variables requeridas
    const indicador = await indicatorModel.findById({_id:id_indicador})
    const formula = indicador.formula;
    var expresiones = formula.split(" ")
    var inputsExpresions = []
    expresiones.forEach((e)=>{
        if(e.substring(0,3) === 'var'){
            inputsExpresions.push(e.substring(4,e.length))
            console.log(e.length);
        }
    })

    const records = await inputModel.find().where('variable').in(inputsExpresions).exec(); //=> add another where for userId

    res.send(records)
    // const indicador = indicatorModel.findOne({name:""})

    //2 traer de mongo inputs del usuario 
    //3 traer de mongo el contexto del indicador (hardcodeado)
    /*

    json = {
        'indicador': {
            'titulo': 'xxx',
            'formula': 'xxx',
            'descripcion': 'xxx',
            'tipo': 'hist',
        },

        'muestra':{ // indicador x contexto  <--- ciencia de datos
            'data': [
                '0-2':5,
                '3-5':10,
                '6-10':3
            ]

        // ciencia de datos:
        // via cron
        // listar indicadores
        // que usuarios estan en un contexto? ---> usuario x contexto
        // (anonimizacion + validacion de la muestra)
        // buscar los input para esos usuarios
        // para cada uno, calculo el indicador con la formula
        // despues armo una distribucion (contexto), segun el tipo de grafico (e.g., histograma)

        },
        'usuario':{
            'last_inputs':
                [0: {
                    variable: 'ingresos',
                    valor: '100',
                    fecha: 'xxxx'
                },
                1: {
                    variable: 'gastos',
                    valor: '50',
                    fecha: 'xxxx'
                }],}
                
                
                // --> si actualiza o mete dato,
                // entonces se dispara jose ciencia de datos
                // que calcula los indicadores donde se usa esta variable
            
                valor_calculado: 50
        }

    }
    */


})




module.exports =  indicatorRouter;