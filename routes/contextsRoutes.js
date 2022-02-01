var express = require('express');
var contextRouter = express.Router();
var Context = require('../models/Contexts');
var Contexts4Users = require('../models/Contexts4Users');

// GET ALL CONTEXTS
contextRouter.get('', async(req, res) =>{
    var response = await Context.find()
    res.send(response) 
})

// GET ALL CONTEXTS 4 USER
contextRouter.get('/:user_id', async(req, res) =>{
    var response = await Contexts4Users.find({user: req.params.user_id})
    console.log(response)
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

module.exports = contextRouter;