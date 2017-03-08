var User = require('../models').User;
var Review = require('../models').Review;
var Movie = require('../models').Movie;

module.exports.loginUser = function(req, res) {
	User
	  .findOne({
	  	where: {
	  		username: req.params.username
	  	}
	  })
	  .then(function(user) {
	  	if (!user) {
	  		res.status(404).send({
	  			message: "User Not Found"
	  		});
	  	}
	  	user.checkPassword(req.query.password, user.password)
	  	.then(function(isMatch) {
	  		res.status(200).send(user);
	  	})
	  	.catch(function(err) {
	  		console.log(err);
	  		res.status(400).send({
	  			message: "invalid Password"
	  		});
	  	});
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  })

}
module.exports.findUser = function(req, res) {
	User
	  .findById(req.params.userId, {
		include: [{
			model: Review,
			as: 'reviews',
			include: [{
				model: Movie
			}]
		}]
	}) 
	  .then(function(user) {
	  	console.log(user)
	  	if (!user) {
	  		res.status(404).send({
	  			message: "User Not found"
	  		});
	  	}
	  	res.status(200).send(user);
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  });
}

module.exports.createUser = function(req, res) {
	console.log(req.body);
	User
	  .create({
	  	firstName: req.body.firstName,
	  	lastName: req.body.lastName,
	  	password: req.body.password,
	  	username: req.body.username,
	  })
	  .then(function(user) {
	  	console.log('success');
	  	res.status(201).send(user);
	  })
	  .catch(function(err) {
	  	console.log(err);
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

function buildUserReviewArray(query) {
	var order, limit;
	if (query.mostRecent && query.mostRecent.toLowerCase() === "true") {
		order = [['createdAt', 'DESC']];
	}
	if (query.limit && parseInt(query.limit, 10)) {
		limit = parseInt(query.limit, 10);
	}
	return {
		order: order,
		limit: limit
	}
}

module.exports.findUserReviews = function(req, res) {
	var query = buildUserReviewArray(req.query);
	User
	  .findById(req.params.userId, {
		include: [{
			model: Review,
			as: 'reviews',
			order: query.order,
			limit: query.limit,
			include: [{
				model: Movie
			}]
		}]
	}) 
	  .then(function(user) {
	  	if (!user) {
	  		res.status(404).send({
	  			message: "user not found"
	  		})
	  	}
	  	res.status(200).send(user.reviews);
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
	  		biography: req.body.biography || user.biography,
	  		favorites: [req.body.movieOne || user.favorites[0], req.body.movieTwo || user.favorites[1], req.body.movieThree || user.favorites[2]],
	  		email: req.body.email || user.email
	  	})
	  
		  .then(function(user) {
		  	res.status(200).send(user);
		  })
		  .catch(function(err) {
		  	res.status(400).send(err);
		  })
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