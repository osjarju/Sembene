const { addToLikedMovies } = require('../controllers/UserController');

const router = require('express').Router();

// app.use('/api/user', UserRoute);

router.post('/add', addToLikedMovies);

module.exports = router;