var User = require('../models').User;
var Review = require('../models').Review;

module.exports.findUser = function(req, res) {
	User.findById(req.params.userId)
	  .then(function(user) {
	  	if (!user) {
	  		return res.status(404).send({
	  			message: "User Not Found"
	  		})
	  	}
	  	res.status(200).send(user);
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  })
}

module.exports.createUser = function(req, res) {
	User
	  .create({
	  	firstName: "Andy",
	  	lastName: "Lui",
	  	biography: "My name is Andy and I am from Diamond Bar California",
	  })
	  .then(function(user) {
	  	res.status(201).send(user);
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  });
}

module.exports.findAllUsers = function(req,res) {
	User
	.findAll()
	.then(function(users) {
		res.status(200).send(users)
	})
	.catch(function(err) {
		res.status(400).send(err);
	});
}

module.exports.findUserReviews = function(req, res) {
	User
	  .findById(req.params.userId, {
	  	include: [{
	  		model: Review,
	  		as: "reviews"
	  	}]
	  }) 
	  .then(function(user) {
	  	if (!user) {
	  		res.status(404).send({
	  			message: "user not found"
	  		})
	  	}
	  	user.status(200).send(user.reviews);
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  });
}

module.exports.editProfile = function(req, res) {
	User
	  .findById(req.params.userId)
	  .then(function(user) {
	  	if (!user) {
	  		res.status(404).send({
	  			message: "Could not find user"
	  		});
	  	}
	  	return user.update({
	  		image: req.body.image || user.image,
	  		biography: req.body.biography || user.biography
	  	});
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  });
}

module.exports.deleteProfile = function(req, res) {
	User
	  .findById(req.params.userId)
	  .then(function(user) {
	  	if (!user) {
	  		res.status(404).send({
	  			message: "Could not find user"
	  		});
	  	}
	  	return user
	  	.destroy()
	  	.then(function() {
	  		res.status(204).send();
	  	})
	  	.catch(function(err) {
	  		res.status(400).send(err);
	  	});

	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  });
}