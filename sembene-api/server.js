require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Database Connected');
        app.listen(5000, () => console.log('Server Listening on port 5000'))
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
