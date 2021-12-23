var express = require('express');
var contextRouter = express.Router();
var Context = require('../models/Contexts');

// GET ALL CONTEXTS
contextRouter.get('', async(req, res) =>{
    var response = await Context.find()
    res.send(response) 
})

module.exports = contextRouter;