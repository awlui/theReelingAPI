var Movie = require('../models').Movie;
var Review = require('../models').Review;
var User = require('../models').User;

module.exports.findReview = function(req, res) {
	Review
	.findOne({
		where: {
			id: req.params.reviewId
		},
		include: [{
			model: Movie,
			attributes: ['poster', 'banner', 'title', 'userId']
		}]
	})
	.then(function(review) {
		if (!review) {
			return res.status(404).send({
				message: "Review Not Found"
			});
		}
		return res.status(200).send(review);
	})
	.catch(function(err) {
		res.status(400).send(err);
	});
}

module.exports.addReview = function(req, res) {
	Review
	  .create({
	  	userId: req.params.userId,
	  	movieId: req.params.movieId,
	  	reviewParagraph: req.body.reviewParagraph,
	  	summary: req.body.summary
	  })
	  .then(function(review) {
	  	res.status(201).send(review);
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  });
}

module.exports.editReview = function(req, res) {
	Review
	  .findById(req.params.reviewId)
	    .then(function(review) {
	  	if (!review) {
	  		res.status(404).send({
	  			message: "Review Not Found"
	  		});
	  		return;
	  	}
	  	if (review.userId !== parseInt(req.body.userId,10)) {
	  		res.status(400).send({
	  			message: "You are not authorized to edit this review"
	  		});
	  		return;
	  	}
	  	return review.update({
	  		reviewParagraph: req.body.reviewParagraph || review.reviewParagraph,
	  		summary: req.body.summary || review.summary
	  	})
	  	.then(function() {
	  		res.status(200).send(review);
	  	})
	  	.catch(function(err) {
	  		res.status(400).send({
	  			message: "Failed to Update"
	  		});
	  	});
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  });
}

module.exports.deleteReview = function(req, res) {
	Review
	  .findById(req.params.reviewId)
	  .then(function(review) {
	  	if (!review) {
	  		res.status(404).send({
	  			message: "Review Not Found"
	  		});
	  		return;
	  	}
	  	return review
	  	.destroy()
	  	.then(function() {
	  		res.status(204).send();
	  	})
	  	.catch(function(err) {
	  		res.status(400).send(err);
	  	})
	  })
	  .catch(function(err) {
	  	res.status(400).send(err);
	  });
}

module.exports.findAllReviews = function(req, res) {
	Review
	.findAll()
	.then(function(reviews){
		res.status(200).send(reviews);
		return;
	})
	.catch(function(err) {
		res.status(400).send(err);
		return;
	})
}
module.exports.findReviewsWithLimit = function(req, res) {
	Review
	.findAll({
		include: [
		{
			model: Movie
		},
		{
			model: User
		}
		],
		limit: req.params.limit
	})
	.then(function(reviews) {
		res.status(200).send(reviews)
		return;
	})
	.catch(function(err) {
		res.status(400).send(err);
		return;
	});
}