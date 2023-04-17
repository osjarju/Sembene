const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    // this is the movie id from the movie API
    // mongo is also going to create a _id field
    id: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    name: {
        type: String,
        required: true,
        max: 50,
    },
    image: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
    },
});

module.exports = mongoose.model('Movie', movieSchema);