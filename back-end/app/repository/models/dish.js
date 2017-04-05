var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    price: {
        type: String,
        required: true
    },
    info: String,
    img: {
        type: String,
        default: '/img/default.jpg'
    },

    ingredients: [{
        type: String,
        lowercase: true,
        trim: true
    }],
    tags: [{
        type: String,
        lowercase: true,
        trim: true
    }],

    created_at: {
        type: Date,
        default: Date.now
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    likes: {
        count: {
            type: Number,
            default: 0
        },
        users: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: "User"
            }],
            default: []
        }
    },
    dislikes: {
        count: {
            type: Number,
            default: 0
        },
        users: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: "User"
            }],
            default: []
        }
    },
    reviews: {
        type: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            comment: String
        }],
        default: []
    }
});
dishSchema.index({
    name: 'text',
    info: 'text',
    price: 'text',
    ingredients: 'text',
    tags: 'text'
});

var Dish = mongoose.model("Dish", dishSchema);
module.exports = Dish;