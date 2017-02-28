'use strict';
//errorCode : 0 - no error/ 1 - error
var ObjectId = require('mongoose').Types.ObjectId;

var DishController = function (dishRepository, userRepository) {

    this.dishRepository = dishRepository;
    this.userRepository = userRepository;

}

DishController.prototype.getDish = function (req, res) {
    var self = this;

    var dishId = req.params.dishId;
    self.dishRepository.findById(dishId, function (err, dish) {
        if (err) {
            console.error(err);
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
DishController.prototype.getLatestDishes = function (req, res) {
    var self = this;
    var page = parseInt(req.query.page);
    var items = parseInt(req.query.items);
    var orderBy = {
        'created_at': -1
    };

    self.dishRepository.findAll(orderBy, items, page, function (err, dishes) {
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

DishController.prototype.getDishesOfAgent = function (req, res) {
    var self = this;
    var userId = req.user._id;
    var page = parseInt(req.query.page);
    var items = parseInt(req.query.items);
    if (page < 1) {
        page = 1;
    }

    if (req.user.isAgent) {
        self.dishRepository.findAll({
            creator: userId
        }, {
            created_at: -1
        }, items, page, function (err, dishes) {
            if (err) res.send(err);
            if (dishes) {
                let resObj = {
                    errorCode: 0,
                    message: "get your dishes successfully",
                    data: user.dishes
                }

                res.json(resObj);
            }
        })
    } else {
        let resObj = {
            errorCode: 0,
            message: "your're not an agent",
            data: dishes
        }

        res.json(resObj);
    }

}

DishController.prototype.addDish = function (req, res) {
    var self = this;
    var userId = req.user._id;

    var dishProps = req.body;

    dishProps = Object.assign({}, dishProps, {
        creator: userId
    });


    self.userRepository.findById(userId, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            self.dishRepository.create(dishProps, function (err, newDish) {
                if (err) {
                    res.send(err);
                } else {
                    //add dish to Agent
                    user.dishes.push(newDish._id);
                    user.save(function (err) {
                        if (err) {
                            res.send(err);
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

        }
    })

};

DishController.prototype.removeDish = function (req, res) {
    var self = this;
    var userId = req.user._id;
    var dishId = ObjectId(req.body.id);
    //remove ref to the dish in User
    self.userRepository.findById(userId, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            //Remove dish from database
            self.dishRepository.findByIdAndRemove(dishId, function (err, dish) {
                if (err) {
                    res.send(err);
                }
                let index = user.dishes.indexOf(dishId);
                user.dishes.splice(index, 1);
                user.save((err) => {
                    if (err) {
                        console.error(err);
                        throw err;
                    }
                });
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

DishController.prototype.updateDish = function (req, res) {
    var self = this;
    // var dishId = req.body.id;
    // var name = req.body.name;
    // var price = req.body.price;
    // var info = req.body.info;
    // var img = req.body.img;
    var dishObj = req.body;
    var id = req.params.dishId;
    dishObj.id = id;

    self.dishRepository.update(dishObj, function (err, dish) {
        if (err) res.send(err);
        let resObj = {
            errorCode: 0,
            message: "updated dish",
            data: dish
        }
        res.json(resObj);
    });
}

module.exports = dishController;