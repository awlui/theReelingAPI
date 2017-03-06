var Movie = require('../models').Movie;
var Review = require('../models').Review;

module.exports.findAllMovies = function(req, res) {
	Movie
	.findAll({
		include: [{
			model: Review,
			as: 'reviews'
		}]
	})
	  .then(function(movies) {
	  	res.status(201).send(movies);
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  });
}

module.exports.findMovie = function(req, res) {
	Movie
	.findById(req.params.movieId, {
		include: [{
			model: Review,
			as: 'reviews'
		}]
	})
	.then(function(movie) {
		if (!movie) {
			return res.status(404).send({
				message: "No Movie Found"
			});
		}
		return res.status(200).send(movie);
	})
	.catch(function(err) {
		res.status(400).send(err);
	});
}

module.exports.addMovie = function(req, res) {
	Movie
	  .create({
	  	id: req.params.movieId,
	  	poster: req.body.poster,
	  	banner: req.body.banner,
	  	summary: req.body.summary,
	  	rating: req.body.rating,
	  	title: req.body.title
	  })
	  .then(function(movie) {
	  	res.status(201).send(movie);
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  });
}