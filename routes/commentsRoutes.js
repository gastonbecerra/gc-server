var express = require('express');
var commentstRouter = express.Router();
var Event = require('../models/Events');
var Comment = require('../models/Comments');
const { check, validationResult } = require('express-validator');

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
    console.log(response)
    try{
        response.length === 0 ? 
        res.status(400).send({
            message: 'no comments founded'
        }) 
        : res.send(response)
    }catch(e){
        console.log('failure getting comments');
    }

})

// GET COMMENTS BY ENTITY AND CONTEXT
commentstRouter.get('/:entity/:context/:indicator', async (req,res)=>{
    console.log(req.params)
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
    console.log(response)
    try{
        response.length === 0 ? 
        res.status(400).send({
            message: 'no comments founded'
        }) 
        : res.send(response)
    }catch(e){
        console.log('failure getting comments');
    }

})

//GET ALL COMMENTS
commentstRouter.get('/', async (req, res)=>{
    res.send(await Comment.find({}))
})
// CREATE COMMENT AND SAVE IT INTO DB
commentstRouter.post('/', async (req, res)=>{
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


commentstRouter.delete('/:id', async (req, res)=>{
    res.send(await Comment.deleteOne({_id: req.params.id}));
})

module.exports = commentstRouter;