var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

var dishSchema = new Schema({
    name: String,
    price: String,
    info: String,
    created_at: {type: Date, default: Date.now},
    likes: {
        count: Number,
        users: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    disLikes:  {
        count: Number,
        users: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    reviews: [{
        user: { type: Schema.Types.ObjectId, ref: "User" },
        comment: String
    }]
});

var Dish = mongoose.model("Dish", dishSchema);
module.exports = Dish;