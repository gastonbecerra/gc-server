var express = require('express');
var contextRouter = express.Router();
var Context = require('../models/Contexts');
var Contexts4Users = require('../models/Contexts4Users');
var Values = require('../models/Values');

// GET ALL CONTEXTS
contextRouter.get('', async(req, res) =>{
    var response = await Context.find()
    res.send(response) 
})

// GET CONTEXT BY USER
contextRouter.get('/:user_id', async(req, res) =>{
    var response = await Contexts4Users.find({user: req.params.user_id})
    // console.log(response)
    res.send(response) 
})

// GET RECOMENDED 4 USER
contextRouter.get('/recommended/:user_id', async(req, res) =>{
    var current_contexts = await Contexts4Users.find({user: req.params.user_id})
    var all_contexts = await Context.find()
    const response = "all_contexts - current_contexts"
    res.send(response) 
})

// REMOVE CONTEXT 4 USER
contextRouter.post('/remove/:user_id/:context', async(req, res) =>{
    var borrar = await Contexts4Users.deleteMany(        
        { $and: [
            {context: req.params.context}, 
            {user: req.params.user_id}
        ] })
    console.log(borrar)
    // muestro los contextos que quedaron
    var response = await Contexts4Users.find({user: req.params.user_id})
    res.send(response) 
})

// ADD CONTEXT 4 USER
contextRouter.post('/add/:user_id/:context', async(req, res) =>{

    // no anduvo insertOne, tuve que usar create, pero me pone una prop "__v"

    var agregar = await Contexts4Users.create(        
        { 
            context: req.params.context , 
            user: req.params.user_id
        });
    console.log(agregar)
    // muestro los contextos que quedaron
    var response = await Contexts4Users.find({user: req.params.user_id})
    res.send(response) 
})

// COUNT USERS INVOLVED IN CREATED CONTEXTS

contextRouter.post('/counter', async (req, res)=>{
    
    // console.log(req.body);
    var conditions = req.body.conditions;

    
        var response1;
        var response2;
        var response = [];

        console.log(conditions);
        if(conditions[0]){
            try{
                    switch (conditions[0].op) {
                        case '$gte':
                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: { $gte: conditions[0].value } }, 
                                    { var: conditions[0].var}
                                ]});
                            response = response1;    
            
                        case '$lte':
                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: { $lte: conditions[0].value } }, 
                                    { var: conditions[0].var}
                                ]});
                            response = response1;
                            
                        case '$in':
                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: { $in: conditions[0].value } }, 
                                    { var: conditions[0].var}
                                ]});
                            response = response1;

                        case '$eq':
                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: conditions[0].value  }, 
                                    { var: conditions[0].var}
                                ]});
                            response = response1;
                        
                        case 'btw':
                            var v1, v2;    
                            conditions[0].value[0] >= conditions[0].value[1] ? v1 =  conditions[0].value[0] : v1 = conditions[0].value[1];
                            conditions[0].value[0] < conditions[0].value[1] ? v2 =  conditions[0].value[0] : v2 = conditions[0].value[1];
                            console.log(v1, v2);

                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: { $gt: v2, $lt: v1 } }, 
                                    { var: conditions[0].var}
                                ]});
                            response = response1;
                            console.log(conditions[0]);

                        case 'contains':
                            console.log(conditions[0])
                            conditions[0].value.forEach((el) =>{
                                
                                
                                var aux =  Values.find(
                                {
                                    $and: [
                                        {var : conditions[0].var},
                                        {value : {$regex: el}}
                                    ]
                                }   
                                )
                                
                                console.log(133, aux);
                            })

                        default:
                            break;                        
                    }
                
            }catch(e){
                console.log(e);
            }
        }
        
        if(conditions[1]){
            try{
                    switch (conditions[1].op) {
                        case '$gte':
                            response2 = await Values.find({ 
                                $and: [ 
                                    { value : { $gte: conditions[1].value } }, 
                                    { var: conditions[1].var}]
                            })        
                            response = response.concat(response2)
            
                        case '$lte':
                            response2 =  await Values.find({ 
                                $and: [ 
                                { value: { $lte: conditions[1].value } }, 
                                { var: conditions[1].var}]
                            })        
                            response = response.concat(response2)
                        
                        case '$in':
                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: { $in: conditions[0].value } }, 
                                    { var: conditions[0].var}
                                ]});
                            response = response1;

                        case '$eq':
                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: conditions[0].value  }, 
                                    { var: conditions[0].var}
                                ]});
                            response = response1;
                        
                        case 'btw':
                            var v1, v2;    
                            conditions[0].value[0] >= conditions[0].value[1] ? v1 =  conditions[0].value[0] : v1 = conditions[0].value[1];
                            conditions[0].value[0] < conditions[0].value[1] ? v2 =  conditions[0].value[0] : v2 = conditions[0].value[1];
                            console.log(v1, v2);

                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: { $gt: v2, $lt: v1 } }, 
                                    { var: conditions[0].var}
                                ]});
                            response = response1;
                            console.log(conditions[0]);
    
                    
                        default:
                            break;
                    }
            }catch(e){
                console.log(e);
            }
        }
    
    console.log(response);
    
    var dictionary = [{user:'placeholder', vars: []}]
    var indexer = []
    var matches = 0;

    try{
        response.forEach((el)=>{
            if(indexer.includes(el.user)){
                var index = response.findIndex((item) => item.user == el.user)
                if(!dictionary[index].vars.includes(el.var)){
                    dictionary[index].vars.push(el.var) 
                    matches = matches +  1;
                }  
            }else{
                dictionary.push({
                    user: el.user, vars: [el.var]
                })
            }
            indexer.push(el.user)
        })
    }catch(e){
        console.log(e);
    }
    console.log(matches, dictionary);
    // res.send({matches, dictionary})
})

module.exports = contextRouter;