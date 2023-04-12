//IMPORT DEPENDENCIES
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/UserRoute');

const app = express();

// app.use('/api/user/UserRoute');

app.use(cors());
app.use(express.json());

//CONNECT MONGODB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    //LOG EXECUTION & HANDLE ERRORS
    .then(() => {
        console.log('Database Connected');
        app.listen(5000, () => console.log('Server Listening on port 5000'))
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
