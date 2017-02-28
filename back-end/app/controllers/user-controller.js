'use strict';
var bcrypt = require('bcrypt-nodejs');

var UserController = function (dishRepository, userRepository) {
    this.dishRepository = dishRepository;
    this.userRepository = userRepository;
}

UserController.prototype.createUser = function (req, res) {
    var self = this;
    //validate
    userObj.username = req.body.username;
    userObj.password = bcrypt.hashSync(req.body.password);
    userObj.hotline = req.body.hotline;
    userObj.address = req.body.address;
    userObj.isAgent = req.body.isAgent;
    userObj.dishes = [];

    //check and save user
    self.userRepository.findAll({
        'username': userObj.username
    }, null, null, null, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (!user) {
            self.userRepository.create(userObj, function (err, newUser) {
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

    self.userRepository.update(userObj, function (err, user) {
        if (err) res.send(err);
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
    req.user.save(function (err) {
        if (err) res.send(err);
    });
    res.json({
        errorCode: 0,
        message: 'Password changed',
        data: req.user
    });
}
module.exports = userHandler;