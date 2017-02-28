var ObjectId = require('mongoose').Types.ObjectId;


var UserActionController = function (dishRepository, userRepository) {
    this.dishRepository = dishRepository;
    this.userRepository = userRepository;
}

UserActionController.prototype.like = function (req, res) {
    var self = this;
    var dishId = req.body.id;
    var userId = ObjectId(req.user._id);

    if (!dishId) {
        let resObj = {
            errorCode: 1,
            message: "missing input",
            data: null
        }
        res.json(resObj);
    } else {
        self.dishRepository.findById(dishId, function (err, dish) {
            if (err) {
                console.error(err);
                throw err;
            }
            if (dish) {
                //if user liked it before, unlike it and vice versa
                if (dish.likes.users.indexOf(userId) == -1) {
                    dish.likes.count++;
                    dish.likes.users.push(userId);
                    dish.save(function (err, dish) {
                        if (err) {
                            console.error(err);
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
                    dish.likes.users.splice(index, 1);
                    dish.save(function (err, dish) {
                        if (err) {
                            console.error(err);
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
    var self = this;
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
        self.dishRepository.findById(dishId, function (err, dish) {
            if (err) {
                console.error(err);
                throw err;
            }
            console.log("dish from dislike function: ", dish);
            if (dish) {
                //if user disdisliked it before, undisdislike it and vice versa
                let index = dish.dislikes.users.indexOf(userId);
                if (index === -1) {

                    dish.dislikes.count++;
                    dish.dislikes.users.push(userId);

                    dish.save(function (err, dish) {
                        if (err) {
                            console.error(err);
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
                    console.log("index: ", index);
                    dish.dislikes.users.splice(index, 1);
                    dish.save(function (err, dish) {
                        if (err) {
                            console.error(err);
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
    var self = this;
    var user = req.user;
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
        self.dishRepository.findById(dishId, function (err, dish) {
            if (err) {
                console.error(err);
                throw err;
            }
            if (dish) {
                let review = {
                    user: userId,
                    comment: comment
                };
                dish.reviews.push(review);
                dish.save(function (err, dish) {
                    if (err) {
                        console.error(err);
                        throw err;
                    }
                    let resObj = {
                        errorCode: 0,
                        message: "commented",
                        data: {
                            user: user,
                            comment: comment
                        }
                    }
                    res.json(resObj);
                })
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

UserActionController.prototype.interest = function (req, res) {
    var dishId = req.body.dishId;
    var id = req.user._id;

    if (!dishId) {
        let resObj = {
            errorCode: 1,
            message: "missing input",
            data: null
        };
        res.json(resObj);
    } else {
        dishId = ObjectId(dishId);
        self.userRepository.findById(id, function (err, user) {
            if (err) res.send(err);
            if (user) {
                let index = user.interests.indexOf(dishId);
                if (index === -1) {
                    user.interests.push(agentId);
                    user.save(function (err) {
                        if (err) res.send(err);
                    })
                    let resObj = {
                        errorCode: 0,
                        message: "interested",
                        data: {
                            user: user,
                            comment: comment
                        }
                    }
                    res.json(resObj);
                } else {
                    user.interests.splice(index, 1);
                    user.save(function (err) {
                        if (err) res.send(err);
                    })
                    let resObj = {
                        errorCode: 0,
                        message: "uninterested",
                        data: {
                            user: user,
                            comment: comment
                        }
                    }
                    res.json(resObj);
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

module.exports = userActionController;