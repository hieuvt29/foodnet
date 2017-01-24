'use strict';

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
                    user.password = req.body.password;
                    user.hotline = req.body.hotline;
                    user.address = req.body.address;
                    user.isAgent = req.body.isAgent;
                    user.dishes = [];

                    user.save(function(err){
                    	if(err){
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
}

module.exports = userHandler;
