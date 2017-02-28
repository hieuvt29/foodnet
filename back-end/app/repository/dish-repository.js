'use strict';
var diff = require('object-diff');

const DishRepository = function (model) {
	this.model = model;
}

DishRepository.prototype.findAll = function (condition, orderBy, items, page, callback) {
	this.model.find(condition)
		.sort(orderBy)
		.skip(items * page)
		.limit(items)
		.populate({
			path: 'likes.users'
		})
		.populate({
			path: 'dislikes.users'
		})
		.populate({
			path: 'reviews.type.user'
		})
		.exec(function (err, dishes) {
			if (err) {
				return callback(err);
			}

			callback(null, dishes);
		});
}

DishRepository.prototype.findById = function (id, callback) {
	this.model.findById(id)
		.populate({
			path: 'likes.users'
		})
		.populate({
			path: 'dislikes.users'
		})
		.populate({
			path: 'reviews.type.user'
		})
		.exec(function (err, dish) {
			if (err) {
				console.error(err);
				return callback(err);
			}

			callback(null, dish);
		});
}

DishRepository.prototype.create = function (dishProps, callback) {
	var model = this.model;
	var newDish = null;

	try {
		newDish = new model(dishProps);
		newDish.save(function (err) {
			if (err)
				return callback(err);
			else
				return callback(null, newDish);
		});
	} catch (err) {
		return callback(err);
	}
}

DishRepository.prototype.update = function (dishProps, callback) {
	var id = dishProps.id;

	this.model.findById(id, function (err, dish) {
		if (err) {
			return callback(err);
		}
		if (dish) {
			dish = Object.assign(dish, dishProps);
			dish.save(function (err) {
				if (err)
					return callback(err);
				else
					return callback(null, dish);
			});

		} else {
			return callback(null, null);
		}
	})

}

DishRepository.prototype.findByIdAndRemove = function (id, callback) {
	this.model.findByIdAndRemove(id, function (err, dish) {
		if (err) callback(err);

		callback(null, dish);
	})
}

module.exports = DishRepository;