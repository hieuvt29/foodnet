exports.like = function (req, res) {
    if (res.liked) {
        let resObj = {
            errorCode: 0,
            message: "liked",
            data: res.liked
        }
        return res.status(200).send(resObj);
    } else if (res.unliked) {
        let resObj = {
            errorCode: 0,
            message: "unliked",
            data: res.unliked
        }
        return res.status(200).send(resObj);
    } else {
        let resObj = {
            errorCode: 1,
            message: "bad request",
            data: null
        }
        return res.status(500).send(resObj);
    }
}

exports.dislike = function (req, res) {
    if (res.disliked) {
        let resObj = {
            errorCode: 0,
            message: "disliked",
            data: res.disliked
        }
        return res.status(200).send(resObj);
    } else if (res.undisliked) {
        let resObj = {
            errorCode: 0,
            message: "disliked",
            data: res.undisliked
        }
        return res.status(200).send(resObj);
    } else {
        let resObj = {
            errorCode: 1,
            message: "bad request",
            data: null
        }
        return res.status(500).send(resObj);
    }
}


exports.comment = function (req, res) {
    if (res.commented) {
        let resObj = {
            errorCode: 0,
            message: "commented",
            data: res.commented
        }
        return res.status(200).send(resObj);
    } else {
        let resObj = {
            errorCode: 1,
            message: "bad request",
            data: null
        }
        return res.status(500).send(resObj);
    }
}

exports.interest = function (req, res) {
    if (res.interested) {
        let resObj = {
            errorCode: 0,
            message: "interested",
            data: res.interested
        }
        return res.status(200).send(resObj);
    } else if (res.uninterested) {
        let resObj = {
            errorCode: 0,
            message: "uninterested",
            data: res.uninterested
        }
        return res.status(200).send(resObj);
    } else {
        let resObj = {
            errorCode: 1,
            message: "bad request",
            data: null
        }
        return res.status(500).send(resObj);
    }
}
