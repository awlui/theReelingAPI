var User = require('../models').User;
var Review = require('../models').Review;
var Movie = require('../models').Movie;

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
	console.log(req.body);
	User
	  .create({
	  	firstName: req.body.firstName,
	  	lastName: req.body.lastName,
	  	password: req.body.password,
	  	username: req.body.username
	  })
	  .then(function(user) {
	  	console.log('success');
	  	res.status(201).send(user);
	  })
	  .catch(function(err) {
	  	console.log('failure');
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
			as: 'reviews',
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