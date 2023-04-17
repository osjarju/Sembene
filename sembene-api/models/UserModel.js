const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     likedMovies: [{
//         type: Schema.Types.ObjectId,
//         ref: 'Movie',
//         required: true
//     }]
// });

// module.exports = mongoose.model('User', userSchema);


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    likedMovies: Array,
});

module.exports = mongoose.model('users', userSchema);