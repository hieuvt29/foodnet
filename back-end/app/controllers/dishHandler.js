'use strict';
//errorCode : 0 - no error/ 1 - error
var Schema = require('mongoose').Schema;
var User = require('../models/User');
var Dish = require('../models/Dish');
var ObjectId = require('mongoose').Types.ObjectId;
var dishHandler = function() {
    this.getDish = function(req, res) {
        var dishId = req.params.dishId;

        Dish.findById(dishId, function(err, dish) {
            if (err) {
                throw err;
            }
            let resObj = {
                errorCode: 0,
                message: "GET succeeded!",
                data: dish
            }
            res.json(resObj);
        });
    }
    this.getLatestDishes = function(req, res) {
        var page = parseInt(req.query.page);
        var items = parseInt(req.query.items);

        Dish.find({})
            .sort({ 'created_at': -1 })
            .skip(items * (page - 1))
            .limit(items)
            .exec(function(err, dishes) {
                if (err) {
                    return console.log(err);
                }
                let resObj = {
                    errorCode: 0,
                    message: "get latest dishes successfully",
                    data: dishes
                }

                res.json(resObj);
            });
    }
    this.getDishesOfAgent = function(req, res) {
        var username = req.user.username;
        if (user.isAgent) {
            User.find({ 'username': username })
                .populate('dishes')
                .exec(function(err, user) {
                    if (err) throw err;
                    let resObj = {
                        errorCode: 0,
                        message: "get your dishes successfully",
                        data: user.dishes
                    }

                    res.json(resObj);
                });
        } else {
            let resObj = {
                errorCode: 0,
                message: "your're not an agent",
                data: dishes
            }

            res.json(resObj);
        }

    }
    this.addDish = function(req, res) {
        var username = req.user.username;
        var name = req.body.name;
        var price = req.body.price;
        var info = req.body.info;
        var img = req.body.img;

        User.findOne({ 'username': username }, function(err, user) {
            if (err) {
                throw err;
            }
            if (user) {
                var newDish = new Dish();
                newDish.name = name;
                newDish.price = price;
                newDish.info = info;
                newDish.img = img;
                newDish.likes = {
                    count: 0,
                    users: []
                };
                newDish.dislikes = {
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
                    errorCode: 0,
                    message: "created dish!",
                    data: newDish
                }
                res.json(resObj);
            }
        })

    };

    this.removeDish = function(req, res) {
        var username = req.user.username;
        var dishId = ObjectId(req.body.id);
        //remove ref to the dish in User
        User.findOne({ 'username': username }, function(err, user) {
            if (err) {
                throw err;
            }
            if (user) {
                let index = user.dishes.indexOf(dishId);
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
                        errorCode: 0,
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
        var name = req.body.name;
        var price = req.body.price;
        var info = req.body.info;
        var img = req.body.img;

        Dish.findById(dishId, function(err, dish) {
            if (err) {
                throw err;
            }

            dish.name = name || dish.name;
            dish.price = price || dish.price;
            dish.info = info || dish.info;
            dish.img = img || dish.img;

            dish.save((err, dish) => {
                if (err) {
                    throw err;
                }
                let resObj = {
                    errorCode: 0,
                    message: "updated dish",
                    data: dish
                }
                res.json(resObj);
            });
        });
    }

    this.like = function(req, res) {
        var dishId = req.body.id;
        var userId = ObjectId(req.user._id);
        console.log("userId :", userId);
        console.log("dishId :", dishId);
        if (!dishId) {
            let resObj = {
                errorCode: 1,
                message: "missing input",
                data: null
            }
            res.json(resObj);
        } else {
            Dish.findById(dishId, function(err, dish) {
                if (err) {
                    throw err;
                }
                //if user liked it before, unlike it and vice versa
                if (dish.likes.users.indexOf(userId) == -1) {
                    dish.likes.count++;
                    dish.likes.users.push(userId);
                    dish.save(function(err, dish) {
                        if (err) {
                            throw err;
                        }
                        let resObj = {
                            errorCode: 0,
                            message: "liked",
                            data: dish
                        }
                        res.json(resObj);
                    });
                } else {
                    dish.likes.count--;
                    let index = dish.likes.users.indexOf(userId);
                    console.log("index: ", index);
                    dish.likes.users.splice(index, 1);
                    dish.save(function(err, dish) {
                        if (err) {
                            throw err;
                        }
                        let resObj = {
                            errorCode: 0,
                            message: "unliked",
                            data: dish
                        }
                        res.json(resObj);
                    });

                }

            });
        }

    }
    this.dislike = function(req, res) {
        var dishId = req.body.id;
        var userId = ObjectId(req.user._id);
        console.log("userId :", userId);
        console.log("dishId :", dishId);
        if (!dishId) {
            let resObj = {
                errorCode: 1,
                message: "missing input",
                data: null
            }
            res.json(resObj);
        } else {
            Dish.findById(dishId, function(err, dish) {
                if (err) {
                    throw err;
                }
                
                //if user disdisliked it before, undisdislike it and vice versa
                if (dish.dislikes.users.indexOf(userId) === -1) {

                    dish.dislikes.count++;
                    //dish.dislikes.users.push(userId);
                    
                    dish.save(function(err, dish) {
                        if (err) {
                            console.log("this is error from save function()");
                            throw err;
                        }
                        let resObj = {
                            errorCode: 0,
                            message: "disliked",
                            data: dish
                        }
                        res.json(resObj);
                    });
                } else {
                    dish.dislikes.count--;
                    let index = dish.dislikes.users.indexOf(userId);
                    console.log("index: ", index);
                    dish.dislikes.users.splice(index, 1);
                    dish.save(function(err, dish) {
                        if (err) {
                            throw err;
                        }
                        let resObj = {
                            errorCode: 0,
                            message: "undisliked",
                            data: dish
                        }
                        res.json(resObj);
                    });

                }

            });
        }

    }

    this.comment = function(req, res) {
        var dishId = req.body.id;
        var userId = req.user._id;
        var comment = req.body.comment;

        if (!dishId || !comment) {
            let resObj = {
                errorCode: 1,
                message: "missing input",
                data: null
            };
            res.json(resObj);
        } else {
            Dish.findById(dishId, function(err, dish) {
                if (err) {
                    throw err;
                }

                let review = { user: userId, commnent: comment };
                dish.reviews.push(review);
                dish.save(function(err, dish) {
                    if (err) {
                        throw err;
                    }
                    let resObj = {
                        errorCode: 0,
                        message: "commented",
                        data: review
                    }
                    res.json(resObj);
                })
            });
        }


    }
}

module.exports = dishHandler;
