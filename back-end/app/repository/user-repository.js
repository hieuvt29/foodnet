'use strict';

var UserRepository = function (model) {
	this.model = model;
}

UserRepository.prototype.create = function (userProps, callback) {
	var model = this.model;
	var newUser = null;
	try {
		newUser = model(userProps);
		newUser.save(function (err) {
			if (err)
				return callback(err);
			else
				return callback(null, newUser);
		});
	} catch (err) {
		return callback(err);
	}
}

UserRepository.prototype.findOne = function (condition, pathPop, selectPop, callback) {
	this.model
		.findOne(condition)
		.populate({
			path: pathPop,
			select: selectPop
		})
		.exec(function (err, user) {
			if (err)
				return callback(err);
			else
				return callback(null, user);
		})
}

UserRepository.prototype.findAll = function (condition, orderBy, items, page, pathPop, selectPop, callback) {
	this.model.find(condition)
		.sort(orderBy)
		.skip(items * page)
		.limit(items)
		.populate({
			path: pathPop,
			select: selectPop
		})
		.exec(function (err, users) {
			if (err) {
				return callback(err);
			}

			callback(null, users);
		});
}

UserRepository.prototype.update = function (userProps, callback) {
	var id = userProps.id;

	this.model.findById(id, function (err, user) {
		if (err) {
			return callback(err);
		}
		if (user) {
			user = Object.assign(user, userProps);
			user.save(function (err) {
				if (err)
					return callback(err);
				else
					return callback(null, user);
			});
		} else {
			return callback(null, null);
		}
	})
}

module.exports = UserRepository;