'use strict';
//errorCode : 0 - no error/ 1 - error
var ObjectId = require('mongoose').Types.ObjectId;
var dependencies = {
    dishRepository: null,
    userRepository: null
}

function DishController(dishRepository, userRepository) {
    dependencies.dishRepository = dishRepository;
    dependencies.userRepository = userRepository;
}
// var DishController = function (dishRepository, userRepository) {

//     this.dishRepository = dishRepository;
//     this.userRepository = userRepository;
// }

DishController.prototype.getDishes = function (req, res) {

    var conditions = req.where;
    var orderBy = req.options.sort;
    var items = req.options.limit;
    var page = req.options.skip;

    var pathPop = 'likes.users dislikes.users reviews.user';
    var selectPop = 'username _id';

    
    dependencies.dishRepository.findAll(conditions, orderBy, items, page, pathPop, selectPop, function (err, dishes) { 
        if (err) {
            let resObj = {
                errorCode: 1,
                message: "bad request",
                data: null
            }
            return res.json(resObj);
        }

        if (dishes) {
            let resObj = {
                errorCode: 0,
                message: "get dishes successfully",
                data: dishes
            }
            res.json(resObj);
        } else {
            let resObj = {
                errorCode: 0,
                message: "not found",
                data: dishes
            }
            res.json(resObj);
        }

    });
}
DishController.prototype.getDish = function (req, res) {

    var dishId = req.params.dishId;
    var selectPop = 'username _id';
    var pathPop = 'likes.users dislikes.users reviews.user';

    dependencies.dishRepository.findById(dishId, pathPop, selectPop, function (err, dish) {
        if (err) {
            let resObj = {
                errorCode: 1,
                message: "bad request",
                data: null
            }
            return res.json(resObj);
        }

        if (dish) {
            let resObj = {
                errorCode: 0,
                message: "get dish successfully",
                data: dish
            }
            res.json(resObj);
        } else {
            let resObj = {
                errorCode: 0,
                message: "not found",
                data: dish
            }
            res.json(resObj);
        }

    });
}
DishController.prototype.getLatestDishes = function (req, res) {

    var page = req.options.skip;
    var items = req.options.limit;
    var orderBy = {
        'created_at': -1
    };
    var selectPop = 'username _id';
    var pathPop = 'likes.users dislikes.users reviews.user';

    dependencies.dishRepository.findAll({}, orderBy, items, page, pathPop, selectPop, function (err, dishes) {
        if (err) {
            let resObj = {
                errorCode: 1,
                message: "bad request",
                data: null
            }
            res.json(resObj);
        } else {

            let resObj = {
                errorCode: 0,
                message: "get latest dishes successfully",
                data: dishes
            }
            res.json(resObj);
        }
    });
}

DishController.prototype.getDishesOfAgent = function (req, res) {

    var agentId = req.where.agentId;
    var page = req.options.skip;
    var items = req.options.limit;
    var selectPop = 'username _id';
    var pathPop = 'likes.users dislikes.users reviews.user';
    if (page < 0) {
        page = 0;
    }

    dependencies.userRepository.findOne({
        '_id': agentId
    }, '', '', function (err, agent) {
        if (err) {
            let resObj = {
                errorCode: 1,
                message: "bad request",
                data: null
            }
            return res.json(resObj);
        }

        if (agent && agent.isAgent) {
            dependencies.dishRepository
                .findAll({creator: agentId}, {
                    created_at: -1
                }, items, page, pathPop, selectPop, function (err, dishes) {
                    if (err) {
                        let resObj = {
                            errorCode: 1,
                            message: "bad request",
                            data: null
                        }
                        return res.json(resObj);
                    }
                    if (dishes) {
                        let resObj = {
                            errorCode: 0,
                            message: "get dishes successfully",
                            data: dishes
                        }

                        res.json(resObj);
                    }
                })
        } else {
            let resObj = {
                errorCode: 0,
                message: "not found",
                data: null
            }

            res.json(resObj);
        }
    })
}

DishController.prototype.addDish = function (req, res) {

    var user = req.user;

    var dishProps = req.body;

    dishProps = Object.assign({}, dishProps, {
        creator: user._id
    });

    if (user && user.isAgent) {
        dependencies.dishRepository.create(dishProps, function (err, newDish) {
            if (err) {
                let resObj = {
                    errorCode: 1,
                    message: "bad request",
                    data: null
                }
                return res.json(resObj);
            } else {
                //add dish to Agent
                user.dishes.push(newDish._id);
                user.save(function (err) {
                    if (err) {
                        let resObj = {
                            errorCode: 1,
                            message: "bad request",
                            data: null
                        }
                        res.json(resObj);
                    }
                });
                //response
                let resObj = {
                    errorCode: 0,
                    message: "created dish",
                    data: newDish
                }
                res.json(resObj);
            }
        })
    } else {
        let resObj = {
            errorCode: 0,
            message: "not found",
            data: null
        }

        res.json(resObj);
    }

};

DishController.prototype.removeDish = function (req, res) {

    var user = req.user;
    var dishId = req.params.dishId;
    //remove ref to the dish in User
    if (user && user.isAgent) {
        //Remove dish from database
        dependencies.dishRepository.findByIdAndRemove(dishId, function (err, dish) {
            if (err) {
                let resObj = {
                    errorCode: 1,
                    message: "bad request",
                    data: null
                }
                return res.json(resObj);
            }
            let index = user.dishes.indexOf(dishId);
            user.dishes.splice(index, 1);
            user.save((err) => {
                if (err) {
                    let resObj = {
                        errorCode: 1,
                        message: "bad request",
                        data: null
                    }
                    res.json(resObj);
                } else {
                    //response
                    let resObj = {
                        errorCode: 0,
                        message: "removed dish",
                        data: dish
                    };
                    res.json(resObj);
                }
            });

        });
    } else {
        let resObj = {
            errorCode: 0,
            message: "not found",
            data: null
        }

        res.json(resObj);
    }
}

DishController.prototype.updateDish = function (req, res) {

    var dishObj = req.body;
    var dishId = req.params.dishId;
    var user = req.user;

    dishObj.id = dishId;

    if (user && user.isAgent) {
        dependencies.dishRepository.update(dishObj, function (err, dish) {
            if (err) {
                let resObj = {
                    errorCode: 1,
                    message: "bad request",
                    data: null
                }
                res.json(resObj);
            } else {
                let resObj = {
                    errorCode: 0,
                    message: "updated dish",
                    data: dish
                }
                res.json(resObj);
            }
        });
    } else {
        let resObj = {
            errorCode: 0,
            message: "not found",
            data: null
        }

        res.json(resObj);
    }
}

module.exports = DishController;