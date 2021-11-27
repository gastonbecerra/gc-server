
var express = require('express');
var contextRouter = express.Router();
var Context = require('../database/mongo/Context')


contextRouter.get('/', async (req,res) => {
    res.json(await Context.find({}))
})







module.exports =  contextRouter;