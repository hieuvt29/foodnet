'use strict';
var bcrypt = require('bcrypt-nodejs');
var dependencies = {
    dishRepository: null,
    userRepository: null
}

var UserController = function (dishRepository, userRepository) {
    dependencies.dishRepository = dishRepository;
    dependencies.userRepository = userRepository;
}

UserController.prototype.createUser = function (req, res) {

    //validate
    var userObj = {};
    userObj.username = req.body.username;
    userObj.password = bcrypt.hashSync(req.body.password);
    userObj.hotline = req.body.hotline;
    userObj.address = req.body.address;
    userObj.isAgent = req.body.isAgent;
    userObj.dishes = [];

    var pathPop = 'dishes';
    var selectPop = null;
    //check and save user
    dependencies.userRepository.findOne({
        'username': userObj.username
    }, pathPop, selectPop, function (err, user) {
        if (err) {
            let resObj = {
                errorCode: 1,
                message: "bad request",
                data: null
            }
            return res.json(resObj);
        }
        if (!user) {
            dependencies.userRepository.create(userObj, function (err, newUser) {
                //response
                let resObj = {
                    errorCode: 0,
                    message: "created user!",
                    data: newUser
                };
                res.json(resObj);
            })
        } else {
            //response
            let resObj = {
                errorCode: 1,
                message: "user exists!",
                data: null
            };
            res.json(resObj);
        }
    })
}
UserController.prototype.updateUser = function (req, res) {
    var userObj = req.body;

    userObj.id = req.user._id;

    dependencies.userRepository.update(userObj, function (err, user) {
        if (err) {
            let resObj = {
                errorCode: 1,
                message: "bad request",
                data: null
            }
            return res.json(resObj);
        }
        let resObj = {
            errorCode: 0,
            message: "updated user!",
            data: user
        };
        res.json(resObj);
    })

}
UserController.prototype.changePassword = function (req, res) {
    var oldPass = req.body.password;
    var newPassword = req.body.newPassword;

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
    if (!bcrypt.compareSync(oldPass, req.user.password)) {
        return res.json({
            errorCode: 1,
            message: 'Password mismatch',
            data: null
        });
    }
    req.user.password = bcrypt.hashSync(newPassword);
    req.user.save(function (err) {
        if (err) {
            let resObj = {
                errorCode: 1,
                message: "bad request",
                data: null
            }
            return res.json(resObj);
        }
        res.json({
            errorCode: 0,
            message: 'Password changed',
            data: req.user
        });
    });

}
module.exports = UserController;