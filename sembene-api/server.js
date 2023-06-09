//IMPORT DEPENDENCIES
const db = require('./config/connection');
const express = require('express');
const cors = require('cors');
const path = require('path');
// const api = require('./routes')

const userRoutes = require('./routes/api/UserRoute');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/api', api);
app.use('/api/user', userRoutes);

app.use(express.static(path.join(__dirname, '../sembene-africana/build')));

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});

