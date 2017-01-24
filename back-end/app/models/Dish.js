var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

var dishSchema = new Schema({
    name: String,
    price: String,
    info: String,
    created_at: {type: Data, default: Date.now},
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

module.exports = mongoose.model("Dish", dishSchema);
