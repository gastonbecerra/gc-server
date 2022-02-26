var express = require('express');
var Event = require('../models/Events');
var eventRouter = express.Router();

// GET ALL/LIMIT EVENTS

eventRouter.get('/:limit', async(req, res) => {
    res.send(await Event.find({}))
})

module.exports = eventRouter;