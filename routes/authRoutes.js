const express = require('express');
const router = express.Router();
const { register, login, depositRobuxHandler, withdrawRobuxHandler } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/deposit', depositRobuxHandler);
router.post('/withdraw', withdrawRobuxHandler);

module.exports = router;

