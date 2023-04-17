const { addToLikedMovies, getLikedMovies } = require('../../controllers/MovieController');
const { removeFromLikedMovies } = require('../../controllers/UserController');
const { createUser, getUser } = require('../../controllers/UserController');
const router = require('express').Router();


router.post('/', createUser);
router.get('/:email', getUser);

// module.exports = router;


router.post('/add', addToLikedMovies);

router.get('/liked/:email', getLikedMovies);

router.put('/delete', removeFromLikedMovies);

module.exports = router;