var mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    type: {
        type: String ,
        default: 'comment'
    },
    message: { 
        type: { },
        required: true
    }, // comment it self
    timestamp: {  
        type: Date,
        default: Date.now()
    },
    user: { 
        type: { },
        required: true
    }, 
    level: { }, //  nesting level in comments tree 
    comments: {  }, // comment's answers
    base_reference: { 
        entity: {},
        context: {},
        indicator: {}
     }, // post, chart o UI element where comes from
    comment_reference: { }, // f | t => references comment source if it comes from another comment
    client_id: { }, // provisional id given by client so it can be edited, deleted and managed.
})

const Comment = mongoose.model("Comment", CommentSchema, "comments");

module.exports = Comment;