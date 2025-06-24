
const router = require('express').Router();
const musicControllers = require('../controllers/music');

router.get('/popularsongs', musicControllers.getPopularSongs);

router.get('/search', musicControllers.getSearchSongs);

module.exports = router;