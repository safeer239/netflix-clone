const express = require("express");
const { getTrendingMovie, getMovieTrailer ,getMovieDetails, getSimilarMovies, getMovieByCategory } = require("../controller/movieController");
const { verifyToken } = require("../utils/token");

const router = express.Router();

router.route('/trending').get(verifyToken,getTrendingMovie)
router.route('/:id/trailers').get(verifyToken,getMovieTrailer)
router.route('/:id/details').get(verifyToken,getMovieDetails)
router.route('/:category').get(verifyToken,getMovieByCategory)
router.route('/:id/similar').get(verifyToken,getSimilarMovies)
module.exports = router;
