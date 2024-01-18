const express = require('express');
const router = express.Router();

router.get('/health', (req, res, next) => {
  res.send('OK');
});

router.use('/games', require('./games'));
router.use('/auth', require('./auth'));
router.use('/votes', require('./votes'));
router.use('/leaderboard', require('./leaderboard'));
router.use('/user', require('./user'));
module.exports = router;
