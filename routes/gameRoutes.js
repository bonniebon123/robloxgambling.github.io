const express = require('express');
const router = express.Router();
const { playGame } = require('../controllers/gameController');

router.post('/play', playGame);

module.exports = router;

