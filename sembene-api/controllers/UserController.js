const User = require('../models/UserModel');

// module.exports.createUser = async (req, res) => {
//     try {
//         const { email } = req.body;
//         if (email) {
//             const user = await User.create({ email });
//             res.json({
//                 message: "user created succesfully",
//                 user
//             })
//         } else {
//             res.status(400).json({
//                 message: "Unable to create an account"
//             })
//         }
//     } catch (error) {
//         res.status(400).json({
//             message: "Unable to create an account",
//             error
//         })
//     }
// };

// module.exports.getUser = async (req, res) => {
//     try {
//         const { email } = req.params;
//         console.log(req.params)
//         if (email) {
//             const user = await User.findOne({ email }).populate("likedMovies");
//             res.json({
//                 message: "Success",
//                 user
//             })
//         } else {
//             res.status(400).json({
//                 message: "Error finding user"
//             })
//         }
//     } catch (error) {
//         res.status(400).json({
//             message: "Error finding user",
//             error
//         })
//     }
// };



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
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (user) {
            res.json({ msg: 'success', movies: user.likedMovies });
        } else return res.json({ msg: 'User not found' });
    } catch (err) {
        return res.json({ masg: 'Error fetching movie' });
    }
};

//DELETE

module.exports.removeFromLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });

        //DELETE MOVIE IF IN LIST
        if (user) {
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({ id }) => (id === movieId));
            if (!movieIndex) res.status(400).send({ msg: 'Movie not found' })
            likedMovies.splice(movieIndex, 1)

            await User.findByIdAndUpdate(
                user._id,
                {
                    likedMovies,
                },
                { new: true }
            );
        }
        return res.json({ msg: 'Movie deleted', movies: likedMovies });
    } catch (err) {
        console.log(err);
        return res.json({ msg: 'Error Deleting movie' });
    }
}