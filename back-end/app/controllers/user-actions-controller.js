var ObjectId = require('mongoose').Types.ObjectId;
var dependencies = {
    dishRepository: null,
    userRepository: null
}


var UserActionController = function (dishRepository, userRepository) {
    dependencies.dishRepository = dishRepository;
    dependencies.userRepository = userRepository;
}

UserActionController.prototype.like = function (req, res) {

    var dishId = req.body.id;
    var userId = req.user._id;
    var selectPop = "_id";
    var pathPop = 'likes.users dislikes.users reviews.user';
    if (!dishId) {
        let resObj = {
            errorCode: 1,
            message: "missing input",
            data: null
        }
        res.json(resObj);
    } else {
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
                //if user liked it before, unlike it and vice versa
                let index = -1;
                let arr = dish.likes.users;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]._id == userId.toString()) {
                        index = i;
                        break;
                    }
                }
                if (index == -1) {
                    dish.likes.count++;
                    dish.likes.users.push(userId);
                    dish.save(function (err, dish) {
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
                            message: "liked",
                            data: dish
                        }
                        res.json(resObj);
                    });
                } else {
                    dish.likes.count--;
                    dish.likes.users.splice(index, 1);
                    dish.save(function (err, dish) {
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
                            message: "unliked",
                            data: dish
                        }
                        res.json(resObj);
                    });

                }

            } else {
                let resObj = {
                    errorCode: 1,
                    message: "not found",
                    data: null
                };
                res.json(resObj);
            }
        });
    }

}

UserActionController.prototype.dislike = function (req, res) {

    var dishId = req.body.id;
    var userId = req.user._id;
    var selectPop = '_id';
    var pathPop = 'likes.users dislikes.users reviews.user';
    if (!dishId) {
        let resObj = {
            errorCode: 1,
            message: "missing input",
            data: null
        }
        res.json(resObj);
    } else {
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
                //if user disdisliked it before, undisdislike it and vice versa
                let index = -1;
                let arr = dish.dislikes.users;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]._id == userId.toString()) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {

                    dish.dislikes.count++;
                    dish.dislikes.users.push(userId);

                    dish.save(function (err, dish) {
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
                            message: "disliked",
                            data: dish
                        }
                        res.json(resObj);
                    });
                } else {
                    dish.dislikes.count--;
                    dish.dislikes.users.splice(index, 1);
                    dish.save(function (err, dish) {
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
                            message: "undisliked",
                            data: dish
                        }
                        res.json(resObj);
                    });

                }
            } else {
                let resObj = {
                    errorCode: 1,
                    message: "not found",
                    data: null
                };
                res.json(resObj);
            }
        });
    }

}

UserActionController.prototype.comment = function (req, res) {

    var user = req.user;
    var dishId = req.body.id;
    var userId = req.user._id;
    var comment = req.body.comment;
    var selectPop = '_id username';
    var pathPop = 'likes.users dislikes.users reviews.user';

    if (!dishId || !comment) {
        let resObj = {
            errorCode: 1,
            message: "missing input",
            data: null
        };
        res.json(resObj);
    } else {
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
                let review = {
                    user: userId,
                    comment: comment
                };
                dish.reviews.push(review);
                dish.save(function (err) {
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
                        message: "commented",
                        data: {
                            user: user.username,
                            comment: comment
                        }
                    }
                    res.json(resObj);
                });

            } else {
                let resObj = {
                    errorCode: 0,
                    message: "not found",
                    data: null
                };
                res.json(resObj);
            }
        });
    }

}

UserActionController.prototype.interest = function (req, res) {
    var dishId = req.body.id;
    var id = req.user._id;

    var pathPop = 'dishes interests';
    var selectPop = null;

    if (!dishId) {
        let resObj = {
            errorCode: 1,
            message: "missing input",
            data: null
        };
        res.json(resObj);
    } else {

        dependencies.userRepository.findOne({
            '_id': id
        }, pathPop, selectPop, function (err, user) {
            if (err) {
                let resObj = {
                    errorCode: 1,
                    message: "bad request",
                    data: null
                }
                return res.json(resObj);
            }
            if (user) {
                let index = -1;
                let arr = user.interests;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]._id == dishId.toString()) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    user.interests.push(dishId);
                    user.save(function (err) {
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
                            message: "interested",
                            data: {
                                dishes: user.interests
                            }
                        }
                        res.json(resObj);
                    })

                } else {
                    user.interests.splice(index, 1);
                    user.save(function (err) {
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
                            message: "uninterested",
                            data: {
                                dishes: user.interests
                            }
                        }
                        res.json(resObj);
                    })

                }
            } else {
                let resObj = {
                    errorCode: 1,
                    message: "not found",
                    data: null
                };
                res.json(resObj);
            }
        })

    }
}

module.exports = UserActionController;