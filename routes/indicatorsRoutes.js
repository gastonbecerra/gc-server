
var express = require('express');
var indicatorRouter = express.Router();
var IndicatorController = require('../controller/indicatorController')
var controller = new IndicatorController();
var indicatorModel = require('../database/mongo/indicatorModel');
var inputModel = require('../database/mongo/inputModel');
var SampleController = require('../controller/sampleController');
var sampleController = new SampleController();
var UserIndicador = require('../database/mongo/userIndicator');

indicatorRouter.get('/', async (req,res) => {
    res.json(await controller.getIndicators())
})

indicatorRouter.get('/:id', async (req,res)=>{
    res.json(await controller.getIndicatorById(req.params.id))
})

indicatorRouter.get('/:id_indicador/:id_contexto/:id_usuario', async (req, res)=>{
    
    const {id_indicador, id_contexto, id_usuario} = req.params;

    // 1) traer de mongo info del indicador: fórmula y variables requeridas
    const indicador = await indicatorModel.findById({_id:id_indicador})
    const formula = indicador.formula;

    var inputsExpresions = []
    formula.forEach((e)=>{
        if(e.tipo.substring(0,3) === 'var'){
            inputsExpresions.push(e.termino)
        }
    })

    const indicator_json = indicador

    // 2) traer de mongo inputs del usuario 

    // const inputs = await inputModel.find().where('variable').in(inputsExpresions).exec();
    const inputs = await inputModel.
        find({
            variable: { $in: inputsExpresions },
            user: id_usuario
        })

    // console.log(inputs)

    var inputsActuales = []
    inputs.forEach((e)=>{
        inputsActuales.push(e.variable)
    })

    let diff = inputsExpresions.filter(x => !inputsActuales.includes(x));

    diff.length === 0 ? diff = false : null;
    
    const input_json = {
        inputs: inputs,
        inputs_faltantes: diff
    }

    // 2do: obviamente no necesito los inputs enteros...

    // 3) traer de mongo el contexto del indicador 

    
    let sample_json = await sampleController.getByIndicatorAndContext(id_indicador, id_contexto)

    sample_json.length === 0 ? sample_json = false : null;

    console.log(id_contexto, sample_json, id_indicador);
    // const indicador = indicatorModel.findOne({name:""})

    // 4) los contextos del usuario?

    /* => ¿Agregar los contextos que necesita?
        => Traer de mongo el valor del método => userindicador */
        let userValue = await UserIndicador.findOne({user: id_usuario});
        
        console.log(80, userValue);
        
        userValue === null ? userValue = false : null;

        console.log(84, userValue);

        user_json = {
        user: userValue,
    }
    

    res.json(

        {
            indicator: indicator_json,
            inputs: input_json,
            context: sample_json,
            user: user_json
        }

    )

})




module.exports =  indicatorRouter;