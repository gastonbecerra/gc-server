var express = require('express');
var inputRouter = express.Router();
var inputModel = require('../database/mongo/inputModel');
var User = require('../database/mongo/userModel');
var {getinputsByUserAndVariables} = require('../controller/utilController');

//GET INPUTS BY USERS ID and INPUTS NAMES
var inputs = ['ingreso', 'gastos']
var id = '6185c7cf68d6c5cf24be977e'

//GET ALL INPUTS
inputRouter.get('/inputs', async (req,res)=>{
    res.send(await inputModel.find())
})

//GET ALL INPUTS BY USER AND VARIABLE NAMES
inputRouter.get('/inputs/:id_user', async (req,res)=>{
    res.json(await getinputsByUserAndVariables(req.params.id_user,inputs))
})



module.exports = inputRouter;



