var express = require('express');
var commentstRouter = express.Router();
var Event = require('../models/Events');
var Comment = require('../models/Comments');

// GET COMMENTS BY ENTITY AND CONTEXT
commentstRouter.get('/:entity', async (req,res)=>{
    
    switch(req.body.entity){
        case 'CHART': 
            break;

        case 'CONTEXT':
            break;
    }
    var response = await  Comment.find({
        $and:[{
            context: req.params.context,
            context: req.params.indicator
        }]   
    })
    response.length === 0 ? 
    res.status(400).send({
        message: 'This is an error!'
    }) 
    : res.send(response)
})


commentstRouter.post('/create', async (req, res)=>{
    console.log(req.body.base_reference);
    const { user, client_id, level, message, timestamp, comments } = req.body.message;

    const comment = new Comment ({
        base_reference: req.body.base_reference,
        user,
        level,
        message,
        timestamp,
        comments,
        client_id,
        comment_reference: req.body.comment_reference
    })

    comment.save().
    then((data)=>{
        res.send(true)
    })
    .catch((e)=>{
        res.status(400).send({
            message: 'error saving comment',
            e
        })
    }) 

})

module.exports = commentstRouter;