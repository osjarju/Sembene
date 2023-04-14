const mongoose = require('mongoose');

const movieListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 50,
    },
    movies: [String],
});

module.exports = mongoose.model('movieList', movieListSchema);