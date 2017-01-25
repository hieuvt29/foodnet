var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Dish = require('./Dish');

var userSchema = new Schema({
	username: String, 
	password: String,
	created_at: {type: Date, default: Date.now},
	address: String,
	hotline: String,
	isAgent: Boolean,
	dishes: [{type: Schema.Types.ObjectId, ref: "Dish"}]
});

var User = mongoose.model("User", userSchema);
module.exports = User;