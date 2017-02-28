'use strict';

var rootPath = process.cwd();
var User = require(rootPath + '/app/repository/models/user');
var Dish = require(rootPath + '/app/repository/models/dish');

var UserRepository = require(rootPath + '/app/repository/user-repository');
var DishRepository = require(rootPath + '/app/repository/dish-repository');

var userRepository = new UserRepository(User);
var dishRepository = new DishRepository(Dish);

var UserController = require(rootPath + '/app/controllers/user-controller');
var DishController = require(rootPath + '/app/controllers/dish-controller');
var UserActionController = require(rootPath + '/app/controllers/user-actions-controller')

var userController = new UserController(dishRepository, userRepository);
var dishController = new DishController(dishRepository, userRepository);
var userActionController = new userActionController(dishRepository, userRepository);

module.exports = function (app, passport) {
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

    //login and logout
    app.route('/login')
        .post(function (req, res, next) {
            passport.authenticate('login', function (err, user, info) {
                if (err) return console.error(err);
                if (!user) {
                    return res.json({
                        errorCode: 1,
                        message: 'Login Failed',
                        data: null
                    });
                }
                req.logIn(user, function (err) {
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
        .get(isLoggedIn, function (req, res) {
            if (req.isAuthenticated()) {
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
        .get(function (req, res) {
            //send index/home page
        });
    app.route('/latest-dishes')
        .get(dishController.getLatestDishes);

    //user Controllers
    app.route('/register')
        .get(function (req, res) {
            //send register page
        })
    //user info
    app.route('/user/info')
        .get(isLoggedIn, function (req, res) {
            if (req.isAuthenticated()) {
                res.json({
                    errorCode: 0,
                    message: "user info",
                    data: req.user
                });
            }
        });
    app.route('/user/change-password')
        .post(isLoggedIn, userController.changePassword);
    //get dishes of an agent
    app.get('/user/dishes', dishController.getDishesOfAgent);

    app.route('/user')
        .post(userController.createUser)
        .put(userController.updateUser);

    //dish Controllers
    app.route('/dishes/:dishId')
        .get(dishController.getDish)
        .put(dishController.updateDish);

    app.route('/agent/dish')
        .post(isLoggedIn, dishController.addDish)
        /* input
            var username = req.user.username;
            var name = req.body.name;
            var price = req.body.price;
            var info = req.body.info;
            var img = req.body.img;
        */
        .put(isLoggedIn, dishController.updateDish)
        /*input:
            var dishId = req.body.id;
            var name = req.body.name;
            var price = req.body.price;
            var info = req.body.info;
            var img = req.body.img;
        
        */
        .delete(isLoggedIn, dishController.removeDish);
    /*input:
        var username = req.user.username;
        var dishId = req.body.id;
    */
    app.post('/agent/dish/like', isLoggedIn, userActionController.like);
    /*input: 
        var dishId = req.body.id;
        var userId = req.user._id;
    */
    app.post('/agent/dish/dislike', isLoggedIn, userActionController.dislike);
    /*input:  
        var dishId = req.body.id;
        var userId = req.user._id;
    */
    app.post('/agent/dish/comment', isLoggedIn, userActionController.comment);
    /*input: 
        var dishId = req.body.id;
        var userId = req.user._id;
        var comment = req.body.comment;
    */
    app.post('agent/dish/interest', isLoggedIn, userActionController.interest)
    /*input
        var agentId = req.body.agentId;
    */
}