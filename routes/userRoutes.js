
var express = require('express');
var userRouter = express.Router();
var userModel = require('../database/mongo/userModel');
var bcrypt = require('bcrypt');

userRouter.post('/login',(req,res)=>{
    console.log(req.body);
})

userRouter.post('/register',(req,res)=>{
    userModel.findOne({ userName: req.body.username}, async(err,doc)=>{
        if (err) throw err;
        if (doc) res.send("User already registerd");
        if (!doc){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new userModel({
                userName: req.body.username,
                password: hashedPassword
            });
            await newUser.save();
            res.send("User created");
        }
    })    
})

userRouter.post('/user',(req,res)=>{
    
})

module.exports = userRouter;