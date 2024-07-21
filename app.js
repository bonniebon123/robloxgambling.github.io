const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const db = require('./utils/db');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/game', gameRoutes);

db.connect();

module.exports = app;
