var bcrypt = require('bcrypt');
var express = require('express');
var userRouter = express.Router();
const passport = require('passport');
var User = require('../database/mongo/User');

// AUTH Routes
userRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("wrong-data");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("user-authenticated");
      });
    }
  })(req, res, next);
});

userRouter.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("user-already-registered");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        type: req.body.admin ? 'admin' : 'user' // TD: define the wyat to assign proper role
      });
      await newUser.save();
      res.send("user-registered");
    }
  });
});

userRouter.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

module.exports = userRouter;