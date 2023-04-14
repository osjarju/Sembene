const User = require('../models/UserModel');

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