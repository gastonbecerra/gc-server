
var express = require('express');
var contextRouter = express.Router();
var ContextController = require('../controller/contextController')
var controller = new ContextController();

contextRouter.get('/', async (req,res) => {
    res.json(await controller.getContexts())
})

module.exports =  contextRouter;