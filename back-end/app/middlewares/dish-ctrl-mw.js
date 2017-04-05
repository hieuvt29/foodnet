exports.getDishes = function (req, res) {
    if (res.dishes) {
        let resObj = {
            errorCode: 0,
            message: "get dishes successfully",
            data: res.dishes
        }
        return res.status(200).send(resObj);
    } else {
        let resObj = {
            errorCode: 1,
            message: "not found",
            data: null
        }
        return res.status(404).send(resObj);
    }
}

exports.getDish = function (req, res) {
    if (res.dish) {
        let resObj = {
            errorCode: 0,
            message: "get dish successfully",
            data: res.dish
        }
        return res.status(200).send(resObj);
    } else {
        let resObj = {
            errorCode: 1,
            message: "not found",
            data: null
        }
        return res.status(404).send(resObj);
    }
}


exports.getLatestDishes = function (req, res) {
    if (res.dishes) {
        let resObj = {
            errorCode: 0,
            message: "get latest dishes successfully",
            data: res.dishes
        }
        return res.status(200).send(resObj);
    } else {
        let resObj = {
            errorCode: 1,
            message: "not found",
            data: null
        }
        return res.status(404).send(resObj);
    }
}

exports.getDishesOfAgent = function (req, res) {
    if (res.dishes) {
        let resObj = {
            errorCode: 0,
            message: "get dishes of agent successfully",
            data: res.dishes
        }
        return res.status(200).send(resObj);
    } else {
        let resObj = {
            errorCode: 1,
            message: "not found",
            data: null
        }
        return res.status(404).send(resObj);
    }
}

exports.addDish = function (req, res) {
    if (res.newDish) {
        let resObj = {
            errorCode: 0,
            message: "created dish",
            data: res.newDish
        }
        return res.status(200).send(resObj);
    } else {
        let resObj = {
            errorCode: 1,
            message: "not found",
            data: null
        }
        return res.status(404).send(resObj);
    }
}

exports.removeDish = function (req, res) {
    if (res.removedDish) {
        let resObj = {
            errorCode: 0,
            message: "removed dish",
            data: res.removedDish
        }
        return res.status(200).send(resObj);
    } else {
        let resObj = {
            errorCode: 1,
            message: "not found",
            data: null
        }
        return res.status(404).send(resObj);
    }
}


exports.updateDish = function (req, res) {
    if (res.updatedDish) {
        let resObj = {
            errorCode: 0,
            message: "updated dish",
            data: res.updatedDish
        }
        return res.status(200).send(resObj);
    } else {
        let resObj = {
            errorCode: 1,
            message: "not found",
            data: null
        }
        return res.status(404).send(resObj);
    }
}