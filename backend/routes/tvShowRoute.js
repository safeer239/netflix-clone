const express = require('express');
const router =express.Router();
const {getTrendingTvShow, getTvShowTrailer, getTvShowDetails, getTvShowCategory, getTvShowSimilar} =require('../controller/tvShowController');
const { verifyToken } = require('../utils/token');

router.route('/trending').get(verifyToken,getTrendingTvShow);
router.route('/:id/trailers').get(verifyToken,getTvShowTrailer);
router.route('/:id/details').get(verifyToken,getTvShowDetails);
router.route('/:category').get(verifyToken,getTvShowCategory);
router.route('/:id/similar').get(verifyToken,getTvShowSimilar)
 
module.exports = router