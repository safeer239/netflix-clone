const express = require('express');
const { verifyToken } = require('../utils/token');
const { searchPerson, searchMovie, searchTvShow, searchHistory, deleteFromSearchHistory } = require('../controller/searchController');
const router =express.Router()

router.route('/actor/:query').get(verifyToken,searchPerson)
router.route('/movie/:query').get(verifyToken,searchMovie)
router.route('/tv/:query').get(verifyToken,searchTvShow)

router.route('/searchHistory').get(verifyToken,searchHistory)
router.route('/deleteSearchHistory/:id').delete(verifyToken,deleteFromSearchHistory)

module.exports = router