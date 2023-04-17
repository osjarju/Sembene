const MovieModel = require('../models/MovieModel');
const User = require('../models/UserModel');

// module.exports.addToLikedMovies = async (req, res) => {
//     try {
//     const { data, email } = req.body;
//     if (data && email) {
//         // get user by email
//         let user = await User.findOne({ email: email })
//         if (user === null) {
//             res.status(400).json({ message: "User doesn't exist" })
//         }

//     // check if the movie exists in the db
//     let movie = await MovieModel.findOne({ id: data.id })
//     //if the movie doesn't exist, creates a new entry in the db
//     if (movie === null) {
//         movie = await MovieModel.create(data)
//     }
//     // add the movie to the liked list only if it hasn't been added
//     await User.updateOne(
//         { _id: user._id },
//         { $addToSet: { likedMovies: movie._id } }
//     )
//     // get the user object
//     user = await User.findOne({ email: email }).populate("likedMovies");
//     res.json({ message: "Success", user })
//     } else {
//         res.status(400).json({ message: "Unable to add movie to liked list." })
//     }
//     } catch (e) {
//         res.status(400).json({ message: "Unable to add movie to liked list.", error: e })
//     }
// }



module.exports.addToLikedMovies = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email });

        //ADD MOVIE TO LIST IF USER EXISTS
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => (id === data.id));
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies, data],
                    },
                    { new: true }
                );
            } else return res.json({ msg: 'Movie is already in favorite list.' });
        } else await User.create({ email, likedMovies: [data] });
        return res.json({ msg: 'Movie added to your favorite list.' });
    } catch (error) {
        return res.json({ msg: 'Error adding movie' });
    }
};

module.exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.json({ msg: 'success', movies: user.likedMovies });
        } else return res.json({ msg: 'User not found' });
    } catch (err) {
        return res.json({ masg: 'Error fetching movie' });
    }
}