'use strict';

// var rootPath = process.cwd();
// rootPath = rootPath.includes("/back-end")?rootPath: rootPath + "/back-end";

// console.log(rootPath);
var User = require('../repository/models/user');
var Dish = require('../repository/models/dish');

var UserRepository = require('../repository/user-repository');
var DishRepository = require('../repository/dish-repository');

var userRepository = new UserRepository(User);
var dishRepository = new DishRepository(Dish);

var UserController = require('../controllers/user-controller');
var DishController = require('../controllers/dish-controller');
var UserActionController = require('../controllers/user-actions-controller')

var userController = new UserController(dishRepository, userRepository);
var dishController = new DishController(dishRepository, userRepository);
var userActionController = new UserActionController(dishRepository, userRepository);

var dishControllerMiddleware = require('../middlewares/dish-ctrl-mw');
var userActionControllerMiddleware = require('../middlewares/user-action-ctrl-mw');

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
    //user Controllers
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

    app.route('/register')
        .get(function (req, res) {
            //send register page
        })
        .post(userController.createUser);

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


    app.route('/user')
        .post(userController.createUser)
        .put(userController.updateUser);



    //dish Controllers
    app.route('/latest-dishes')
        .get(dishController.getLatestDishes, dishControllerMiddleware.getLatestDishes);
    app.route('/dishes')
        .get(dishController.getDishes, dishControllerMiddleware.getDishes);

    app.route('/agent/dishes/:dishId')
        .get(dishController.getDish, dishControllerMiddleware.getDish)
        .put(isLoggedIn, dishController.updateDish, dishControllerMiddleware.updateDish)
        .delete(isLoggedIn, dishController.removeDish, dishControllerMiddleware.removeDish);


    app.route('/agent/dishes')
        .get(dishController.getDishesOfAgent, dishControllerMiddleware.getDishesOfAgent)
        .post(isLoggedIn, dishController.addDish, dishControllerMiddleware.addDish)
    /* input
        var username = req.user.username;
        var name = req.body.name;
        var price = req.body.price;
        var info = req.body.info;
        var img = req.body.img;
    */


    app.post('/agent/dish/like', isLoggedIn, userActionController.like, userActionControllerMiddleware.like);
    /*input: 
        var dishId = req.body.id;
        var userId = req.user._id;
    */
    app.post('/agent/dish/dislike', isLoggedIn, userActionController.dislike, userActionControllerMiddleware.dislike);
    /*input:  
        var dishId = req.body.id;
        var userId = req.user._id;
    */
    app.post('/agent/dish/comment', isLoggedIn, userActionController.comment, userActionControllerMiddleware.comment);
    /*input: 
        var dishId = req.body.id;
        var userId = req.user._id;
        var comment = req.body.comment;
    */
    app.post('/agent/dish/interest', isLoggedIn, userActionController.interest, userActionControllerMiddleware.interest);

    //index page
    app.route('/', '/home')
        .get(function (req, res) {
            //send index/home page
        });

}