const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    // movieLists: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: 'movieList'
    //     }
    // ],
    likedMovies: Array
});

module.exports = mongoose.model('users', userSchema);