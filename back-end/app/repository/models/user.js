var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		minlength: 4,
		maxlength: 30
	}, 
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 4,
		maxlength: 30
	},
	created_at: {type: Date, default: Date.now},
	location: {
		latitude: String,
		longitude: String
	},
	address: { type: String, lowercase: true, trim: true },
	hotline: {
		type: String,
		validate: [function(val){
			if(val){
				if(/^\d{10,}$/.test(val))
					return true;
				else
					return false;
			}else{
				return true;
			}
		}, "Invalid phone number"]
	},
	
	isAgent: {
		type: Boolean,
		required: true
	},

	dishes:{type: [{type: Schema.Types.ObjectId, ref: "Dish"}], default: []},

	interests : {type: [{type: Schema.Types.ObjectId, ref: "Dish"}], default: []}
	
});

module.exports = mongoose.model('User', userSchema); 
