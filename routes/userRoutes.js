var bcrypt = require('bcrypt');
var express = require('express');
var userRouter = express.Router();
var User = require('../models/User');
const passport = require("passport");

userRouter.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

userRouter.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000");
});

userRouter.get("/logout", function(req, res){
    req.logout();
    res.redirect("http://localhost:3000");
});

userRouter.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

module.exports = userRouter;