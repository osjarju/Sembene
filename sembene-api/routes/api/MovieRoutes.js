const { addToLikedMovies } = require('../../controllers/MovieController');
const router = require('express').Router();

router.post('/add', addToLikedMovies);

// router.get('/liked/:email', getLikedMovies);

module.exports = router;