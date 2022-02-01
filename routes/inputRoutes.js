var express = require('express');
var varRouter = express.Router();
var Var = require('../models/Vars');
var Values = require('../models/Values');


// GET ALL VARS 

varRouter.get('/', async (req, res)=>{
    
    // 1) Traemos todas las variables
   
    var vars = await Var.find({});
    res.json(vars)

})

module.exports = varRouter;

