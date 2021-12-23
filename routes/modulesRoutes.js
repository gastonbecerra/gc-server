var express = require('express');
var moduleRouter = express.Router();
var Module = require('../models/Modules');

// GET ALL MODULES
moduleRouter.get('', async(req, res) =>{
    var response = await Module.find()
    res.send(response) 
})

module.exports = moduleRouter;