'use strict';
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/User');

var userHandler = function() {
    this.createUser = function(req, res) {
        User.findOne({ 'username': req.body.username })
            .exec(function(err, user) {
                if (err) {
                    throw err;
                }
                if (!user) {
                    var user = new User();
                    user.username = req.body.username;
                    user.password = bcrypt.hashSync(req.body.password);
                    user.hotline = req.body.hotline;
                    user.address = req.body.address;
                    user.isAgent = req.body.isAgent;
                    user.dishes = [];

                    user.save(function(err) {
                            if (err) {
                                throw err;
                            }
                        })
                        //response
                    let resObj = {
                        errorCode: 1,
                        message: "created user!",
                        data: user
                    };
                    res.json(resObj);
                } else {
                    //response
                    let resObj = {
                        errorCode: 0,
                        message: "user exists!",
                        data: null
                    };
                    res.json(resObj);
                }
            })
    }

    this.changePassword = function(req, res) {
        var oldPass = req.body.password;
        var newPass = req.body.newPassword;
        if (!oldPass) {
            return res.json({
                errorCode: 1,
                message: 'Missing argument \'password\'',
                data: null,
            });
        }
        if (!newPassword) {
            return res.json({
                errorCode: 1,
                message: 'Missing argument \'new password\'',
                data: null,
            });
        }
        if (!bcrypt.compareSync(password, req.user.password)) {
            return res.json({ 
                errorCode: 1, 
                message: 'Password mismatch',
                data: null
            });
        }
        req.user.password = bcrypt.hashSync(newPassword);
        req.user.save();
        res.json({ 
            errorCode: 0, 
            message: 'Password changed',
            data: req.user
        });
    }
}

module.exports = userHandler;
