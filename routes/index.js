var express = require('express');
var router = express.Router();
var movieControllers = require('../server/controllers/movies');
var reviewControllers = require('../server/controllers/reviews');
var userControllers = require('../server/controllers/users');
/* GET home page. */
router.get('/user', userControllers.findAllUsers);
router.get('/movie', movieControllers.findAllMovies);
router.get('/review', reviewControllers.findAllReviews);
router.get('/review/:limit', reviewControllers.findReviewsWithLimit);

router.get('/movie/:movieId', movieControllers.findMovie);
router.get('/user/:userId', userControllers.findUser);
router.get('/user/:userId/review', userControllers.findUserReviews);  //QUERIES mostRecent and limit
router.get('/review/:reviewId', reviewControllers.findReview);


router.post('/user', userControllers.createUser);
router.post('/movie/:movieId', movieControllers.addMovie);
router.post('/movie/:movieId/review/:userId', reviewControllers.addReview);


router.put('/movie/:movieId/review/:reviewId', reviewControllers.editReview);
router.put('/user/:userId', userControllers.editProfile);

router.delete('/user/:userId', userControllers.deleteProfile);
router.delete('/user/review/:reviewId', reviewControllers.deleteReview);


module.exports = router;
