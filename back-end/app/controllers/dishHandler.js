'use strict';
//errorCode : 0 - no error/ 1 - error

var User = require('../models/User');
var Dish = require('../models/Dish');

var dishHandler = function() {
    this.getDish = function(req, res) {
        var dishId = req.params.dishId;

        Dish.findById(dishId, function(err, dish) {
            if (err) {
                throw err;
            }
            let resObj = {
                errorCode: 0;
                message: "GET succeeded!",
                data: dish
            }
            res.json(resObj);
        });
    }
    this.getLatestDishes = function(req, res) {
        var page = req.params.page;
        var items = req.params.items;

        Dish.find({})
            .sort('created_at': -1)
            .skip(items * (page - 1))
            .limit(items)
            .exec(function(err, dishes) {
                let resObj = {
                    errorCode: 0;
                    message: "get latest dishes successfully",
                    data: dishes
                }
                res.json(resObj);
            });
    }
    this.addDish = function(req, res) {
        var username = req.user.username;
        User.findOne({ 'username': username }, function(err, user) {
            if (err) {
                throw err;
            }
            if (user) {
                var newDish = new Dish();
                newDish.name = req.body.name;
                newDish.price = req.body.price;
                newDish.info = req.body.info;
                newDish.likes = {
                    count: 0,
                    users: []
                };
                newDish.likes = {
                    count: 0,
                    users: []
                };
                newDish.reviews = [];

                newDish.save(function(err) {
                    if (err) {
                        throw err;
                    }
                });

                //add dish to Restaurant
                user.dishes.push(newDish._id);
                user.save(function(err) {
                    if (err) {
                        throw err;
                    }
                });
                //response
                let resObj = {
                    errorCode: 0;
                    message: "created dish!",
                    data: newDish
                }
                res.json(resObj);
            }
        })

    };

    this.removeDish = function(req, res) {
        var username = req.user.username;
        var dishId = req.body.id;
        //remove ref to the dish in User
        User.findOne({ 'username': username }, function(err, user) {
            if (err) {
                throw err;
            }
            if (user) {
                let index = user.dishes.indexOf(Schema.Types.ObjectId(dishId));
                user.dishes.splice(index, 1);
                user.save((err) => {
                    if (err) {
                        throw err;
                    }
                });
                //Remove dish from database
                Dish.findByIdAndRemove(dishId, function(err, dish) {
                    if (err) {
                        throw err;
                    }
                    //response
                    let resObj = {
                        errorCode: 0;
                        message: "removed dish!",
                        data: dish
                    };
                    res.json(resObj);
                });
            }
        });
    }

    this.updateDish = function(req, res) {
        var dishId = req.body.id;

        Dish.findById(dishId, function(err, dish) {
            if (err) {
                throw err;
            }

            dish.name = req.body.name || dish.name;
            dish.price = req.body.price || dish.price;
            dish.info = req.body.info || dish.info;

            dish.save((err, dish) => {
                if (err) {
                    throw err;
                }
                let resObj = {
                    errorCode: 0;
                    message: "updated dish",
                    data: dish
                }
                res.json(resObj);
            });
        });
    }

    this.like = function(req, res) {
        var dishId = req.body.id;
        var userId = req.user._id;

        Dish.findById(dishId, function(err, dish) {
            if (err) {
                throw err;
            }

            dish.likes.count++;
            dish.likes.users.push(userId);
            dish.save(function(err, dish) {
                if (err) {
                    throw err;
                }
                let resObj = {
                    errorCode: 0;
                    message: "liked",
                    data: dish
                }
                res.json(resObj);
            })
        });
    }
    this.dislike = function(req, res) {
        var dishId = req.body.id;
        var userId = req.user._id;

        Dish.findById(dishId, function(err, dish) {
            if (err) {
                throw err;
            }

            dish.dislikes.count--;
            let index = dish.dislikes.users.indexOf(userId);
            dish.dislikes.users.splice(index, 1);

            dish.save(function(err, dish) {
                if (err) {
                    throw err;
                }
                let resObj = {
                    errorCode: 0;
                    message: "disliked",
                    data: dish
                }
                res.json(resObj);
            })
        });
    }
}
