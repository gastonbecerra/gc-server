var mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    message: { }, // comment it self
    timestamp: {  
        type: Date,
        default: Date.now()
    },
    user: { }, 
    level: { }, //  nesting level in comments tree 
    comments: {  }, // comment's answers
    base_reference: {  }, // post, chart o UI element where comes from
    comment_reference: { }, // f | t => references comment source if it comes from another comment
    client_id: { }, // provisional id given by client so it can be edited, deleted and managed.
})

const Comment = mongoose.model("Comment", CommentSchema, "comments");

module.exports = Comment;