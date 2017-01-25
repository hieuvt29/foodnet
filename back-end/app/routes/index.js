'use strict';

var rootPath = process.cwd();
var UserHandler = require(rootPath + '/app/controllers/userHandler');
var DishHandler = require(rootPath + '/app/controllers/dishHandler');

module.exports = function(app, passport) {
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.json({
                errorCode: 1,
                message: "not login",
                data: null
            })
        }
    }

    console.log(dishHandler);

    var userHandler = new UserHandler();
    var dishHandler = new DishHandler();

    //login and logout
    app.route('/login')
        .post(function(req, res, next) {
            passport.authenticate('login', function(err, user, info) {
                if (err) return console.error(err);
                if (!user) {
                    return res.json({
                        errorCode: 1,
                        message: 'Login Failed',
                        data: null
                    });
                }
                req.logIn(user, function(err) {
                    if (err) throw err;
                    return res.json({
                        errorCode: 0,
                        message: 'Login successfully',
                        data: user
                    });
                });
            })(req, res, next);
        });

    app.route('/logout')
        .get(function(req, res) {
            if(req.isAuthenticated()){
                req.logout();
            }
            res.json({
                errorCode: 0,
                message: "Logout successfully",
                data: null
            });
        });

    //index page
    app.route('/', '/home')
        .get(function(req, res) {
            //send index/home page
        });
    app.route('/latest-dishes')
        .get(dishHandler.getLatestDishes);

    //user handlers
    app.route('/register')
        .get(function(req, res) {
            //send register page
        })
    app.route('/users')
        .post(userHandler.createUser);

    //dish handlers
    app.route('/dishes/:dishId')
        .get(dishHandler.getDish);

    app.route('/agent/dish')
        .post(isLoggedIn, dishHandler.addDish)
        .put(isLoggedIn, dishHandler.updateDish)
        .delete(isLoggedIn, dishHandler.removeDish);

    //user info
    app.route('/user/info')
        .get(isLoggedIn, function(req, res) {
            if(req.isAuthenticated()){
                res.json({
                    errorCode: 0,
                    message: "user info",
                    data: req.user
                });
            }
        });
    app.route('/user/change-password')
        .post(isLoggedIn, userHandler.changePassword);
}
