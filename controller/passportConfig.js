//AUTH [passport] variables & Settings
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
var userModel = require('../database/mongo/userModel');
const passport = require('passport');

module.exports = function (passport) {
    passport.use(
      new localStrategy((username, password, done) => {
        userModel.findOne({ username: username }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      })
    );
  
    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
      userModel.findOne({ _id: id }, (err, user) => {
        const userInformation = {
          username: user.username,
          id: user.id,
          type: user.type
        };
        cb(err, userInformation);
      });
    });
  };
