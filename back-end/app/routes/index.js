'use strict';

var rootPath = process.cwd();
var UserHandler = require(rootPath + '/app/controllers/userHandler');
var DishHandler = require(rootPath + '/app/controllers/dishHandler');

module.exports = function(app, passport) {
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }

    var userHandler = new UserHandler();
    var dishHandler = new DishHandler();

    //login and logout
    app.route('/login')
        .get(function(req, res) {
            //send login page
        })
        .post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }));

    app.route('/logout')
        .get(function(req, res) {
            req.logout();
            res.redirect('/');
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
    	.get(function(req, res){
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


    //profile
    app.route('/user/profile')
    	.get(function(req, res){
    		//send profile page
    	});
}	
