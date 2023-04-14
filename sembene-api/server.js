//IMPORT DEPENDENCIES
const db = require('./config/connection');
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/api/user', UserRoute);

let user = "something";
console.log(user);

app.post("/api/user/add", async (req, res) => {
    const { email } = req.body;

    try {
        const user = new user({ email });
        await user.add();
        res.json({ msg: "endpoint works" });
    } catch (error) {
        res.status(500).json({ msg: 'Error' })
        console.log(error)
    }
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});

// app.use('/api/user/UserRoute');
