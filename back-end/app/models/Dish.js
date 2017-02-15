var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
    name: String,
    price: String,
    info: String,
    img: String,
    created_at: { type: Date, default: Date.now },
    likes: {
        count: Number,
        users: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    dislikes: {
        count: Number,
        users: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    reviews: [{
        user: { type: Schema.Types.ObjectId, ref: "User" },
        comment: String
    }], 
    user: { type: Schema.Types.ObjectId, ref: "User" }
});

var Dish = mongoose.model("Dish", dishSchema);
module.exports = Dish;
