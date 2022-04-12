var express = require('express');
var Event = require('../models/Events');
var Comment = require('../models/Comments');
var Sample = require('../models/Samples');
var eventRouter = express.Router();

// GET ALL/LIMIT EVENTS
// eventRouter.get('/:limit', async (req, res) => {
//     res.send(await Event.find({}).limit(req.params.limit))
// })

// GET ALL/LIMIT EVENTS
eventRouter.get('/:limit', async (req, res) => {
    // 1) capture x n° of grl event types?

    var events = await Event.find({

    })
    .sort({
        timestamp: 1
    })
    .limit(
        req.params.limit / 2
    )
    
    events.length === 0 ? events = false : null;

    // 2) capture x n° of comments events types
    var comments = await Comment.find({
        comment_reference : false
    })
    .sort({
        timestamp: 1
    })
    .limit(
        req.params.limit / 2
    )
    
    comments.length === 0 ? comments = false : null;
    
    var response = Object.assign(events, comments);

    res.send(response);
})



module.exports = eventRouter;