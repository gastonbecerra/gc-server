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
    Contexts4Users.deleteOne({ 
        $and: [
            {context: req.params.context}, 
            {user: req.params.user_id}
        ]
    }).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
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
    // var response = await Contexts4Users.find({user: req.params.user_id})
    // res.send(response) 
})

// COUNT USERS INVOLVED IN CREATED CONTEXTS

contextRouter.post('/counter', async (req, res)=>{
    
    // 1) catch conditions sent in body
    var conditions = req.body.conditions;

    // 2) implement switch query on none null or false conditions
        
    var response;
    var response2; 
    var qty_rules = 0;
        
    if(conditions[0]){
        qty_rules = qty_rules + 1; 
        try{
                var response1 = []; 
                    switch (conditions[0].op) {
                        case '$gte':
                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: { $gte: conditions[0].value } }, 
                                    { var: conditions[0].var}
                                ]});
                            break;
            
                        case '$lte':
                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: { $lte: conditions[0].value } }, 
                                    { var: conditions[0].var}
                                ]});
                            break;
                        
                            case '$in':
                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: { $in: conditions[0].value } }, 
                                    { var: conditions[0].var}
                                ]});
                            break;

                        case '$eq':
                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: conditions[0].value  }, 
                                    { var: conditions[0].var}
                                ]});
                            break;
                        
                        case 'btw':
                            var v1, v2;    
                            conditions[0].value[0] >= conditions[0].value[1] ? v1 =  conditions[0].value[0] : v1 = conditions[0].value[1];
                            conditions[0].value[0] < conditions[0].value[1] ? v2 =  conditions[0].value[0] : v2 = conditions[0].value[1];                        

                            response1 =  await Values.find({ 
                                $and: [ 
                                    { value: { $gt: v2, $lt: v1 } }, 
                                    { var: conditions[0].var}
                                ]});
                            break;
                            

                        case 'contains':
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
                            break;

                        default:
                            break;                        
                    }
                    
                    response1.length === 0 ? response1 = false : null;
                    
            }catch(e){
                console.log(e);
            }
    }
        
    if(conditions[1]){
        qty_rules = qty_rules + 1; 
        try{
                var response2 = []; 
                    switch (conditions[1].op) {
                        case '$gte':
                            response2 =  await Values.find({ 
                                $and: [ 
                                    { value: { $gte: conditions[1].value } }, 
                                    { var: conditions[1].var}
                                ]});
                            break;
            
                        case '$lte':
                            response2 =  await Values.find({ 
                                $and: [ 
                                    { value: { $lte: conditions[1].value } }, 
                                    { var: conditions[1].var}
                                ]});
                            break;
                        
                            case '$in':
                            response2 =  await Values.find({ 
                                $and: [ 
                                    { value: { $in: conditions[1].value } }, 
                                    { var: conditions[1].var}
                                ]});
                            break;

                        case '$eq':
                            response2 =  await Values.find({ 
                                $and: [ 
                                    { value: conditions[1].value  }, 
                                    { var: conditions[1].var}
                                ]});
                            break;
                        
                        case 'btw':
                            var v1, v2;    
                            conditions[1].value[0] >= conditions[1].value[1] ? v1 =  conditions[1].value[0] : v1 = conditions[1].value[1];
                            conditions[1].value[0] < conditions[1].value[1] ? v2 =  conditions[1].value[0] : v2 = conditions[1].value[1];                        

                            response2 =  await Values.find({ 
                                $and: [ 
                                    { value: { $gt: v2, $lt: v1 } }, 
                                    { var: conditions[1].var}
                                ]});
                            break;
                            

                        case 'contains':
                            conditions[1].value.forEach((el) =>{                                
                                
                                var aux =  Values.find(
                                {
                                    $and: [
                                        {var : conditions[1].var},
                                        {value : {$regex: el}}
                                    ]
                                }   
                                )
                                
                                console.log(133, aux);
                            })
                            break;

                        default:
                            break;                        
                    }
                    
                    response2.length === 0 ? response2 = false : null;
                    
            }catch(e){
                console.log(e);
            }
    }
        
    // concatenating responses data
    if( response1 && response2 ){
        response = response1.concat(response2)
    }

    if( response1 && !response2 ){
        response = response1;
    }

    if( !response1 && !response2 ){
        response = false;
    }

    if( !response1 && response2 ){
        response = response2;
    }

    console.log(response, qty_rules);

    // finding-counting users that matches each criteria
    var dictionary = [{user:'placeholder', vars: []}] // array of users data
    var indexer = [] // add each user finded in response
    var matches = 0; // counts the amount of users that matches each specified criteria

    try{

        response.forEach((el)=>{ // iterate every reponse value
            
            if(indexer.includes(el.user)){ // if users is alredy indexed in indexer
                var index = dictionary.findIndex((item) => item.user === el.user) // go find de index where it is
                if(!dictionary[index].vars.includes(el.var)){ // if user's vars dont have el.var still added
                    dictionary[index].vars.push(el.var)       // => push it  
                    dictionary[index].vars.length === qty_rules ? matches ++  : null; // if user have all rules, matches ++ 
                    indexer.push(el.user) // add user into indexer
                }  
            }

            if(!indexer.includes(el.user)){ // if users is not yet indexed
                dictionary.push( // => push its data into the dictionary
                    {
                        user: el.user, vars: [el.var]
                    })
                    var index = dictionary.findIndex((item) => item.user === el.user) // go find de index where it is
                    dictionary[index].vars.length === qty_rules ? matches ++  : null; // if user have all rules, matches ++
                    indexer.push(el.user) // add user into indexer
            }
        })
        
        }catch(e){
            console.log(e);
        }

        console.log(matches, dictionary);

        res.send({matches, dictionary})
})


// CREATE CONTEXT BY USER

contextRouter.post('/create', async (req, res)=>{
    var cratedContext = req.body;
    var {context, user, timestamp, info, conditions} = cratedContext;
    console.log(cratedContext, context)
    
    const newContext = new Context({
        user,
        timestamp,
        info,
        context,
        condition: conditions
    })

    newContext.save()
    .then((data)=>{
        res.send(data)
    })


})

module.exports = contextRouter;