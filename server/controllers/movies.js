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
	  	poster: "dbNtoDhR9jNhrX1k9lTxD8sTMjd.jpg",
	  	banner: "IfB9hy4JH1eH6HEfIgIGORXi5h.jpg",
	  	summary:"In an innocent heartland city, five are shot dead by an expert sniper. The police quickly identify and arrest the culprit, and build a slam-dunk case. But the accused man claims he's innocent and says \"Get Jack Reacher.\" Reacher himself sees the news report and turns up in the city. The defense is immensely relieved, but Reacher has come to bury the guy. Shocked at the accused's request, Reacher sets out to confirm for himself the absolute certainty of the man's guilt, but comes up with more than he bargained for.",
	  	rating: 6.9,
	  	title: "Jack Reacher"
	  })
	  .then(function(movie) {
	  	res.status(201).send(movie);
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  });
}