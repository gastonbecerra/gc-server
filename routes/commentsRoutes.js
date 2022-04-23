var express = require('express');
var commentstRouter = express.Router();
var Comment = require('../models/Comments');

// GET COMMENTS BY ENTITY 
commentstRouter.get('/:entity', async (req,res)=>{
    let response = []; 
    switch(req.params.entity){
        case 'chart':
            response = await Comment.find({                
                'base_reference.entity': req.params.entity,
            }).sort({
                'base.base_reference.indicator': 1, // sorted by indicator
                timestamp: 1 // last comments goes firsts
            })
            break;

        case 'context':
            break;
    }
    
    try{
        response.length === 0 ? 
        res.status(400).send({
            message: 'no comments founded'
        }) 
        : res.send(response)
    }catch(e){
        res.send('failure getting comments');
    }

})

// GET COMMENTS BY ENTITY AND CONTEXT
commentstRouter.get('/:entity/:context/:indicator', async (req,res)=>{
    let response = []; 
    switch(req.params.entity){
        case 'chart':
            response = await Comment.find({
                $and:[{
                    'base_reference.entity': req.params.entity,
                    'base_reference.context': req.params.context,
                    'base_reference.indicator': req.params.indicator
                }]   
            }).sort({
                timestamp: 1
            })
            break;

        case 'context':
            break;
    }
    
    try{
        response.length === 0 ? 
        res.status(400).send({
            message: 'no comments founded'
        }) 
        : res.send(response)
    }catch(e){
        
    }

})

//GET ALL COMMENTS
commentstRouter.get('/', async (req, res)=>{
    res.send(await Comment.find({}).limit(10))
})

// CREATE COMMENT AND SAVE IT INTO DB
commentstRouter.post('/', async (req, res)=>{
    console.log(req.body);
    const { user, client_id, level, message, timestamp, comments } = req.body.message;
    var type = 'comment'; // by default    
    req.body.message.type !== (undefined && false) ? type = req.body.message.type : null;

    const comment = new Comment ({
        base_reference: req.body.base_reference,
        user,
        level,
        message,
        timestamp,
        comments,
        client_id,
        type,
        comment_reference: req.body.comment_reference
    })

    comment.save().
    then((data)=>{
        res.send(true)
    })

    // ACTIVATE WEB SOCKET FOR PUSH NOTIFICATION

    .catch((e)=>{
        res.status(400).send({
            message: 'error saving comment',
            e
        })
    }) 

})


commentstRouter.delete('/:id', async (req, res)=>{
    res.send(await Comment.deleteOne({_id: req.params.id}));
})

module.exports = commentstRouter;