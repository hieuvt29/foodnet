'use strict';

var User = require('../models/User');

var bcrypt = require('bcrypt-nodejs');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


module.exports = function(passport) {
    //session configure
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('login', new LocalStrategy(
        function(username, password, done) {
            User.findOne({ 'username': username }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));
}
