const userRoutes = require('./api/UserRoute');
const movieRoutes = require('./api/MovieRoutes');

const router = require('express').Router();

router.use('/user', userRoutes);
router.use('/movie', movieRoutes);

module.exports = router;