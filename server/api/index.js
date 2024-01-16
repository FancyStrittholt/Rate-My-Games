const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', (req, res, next) => {
  res.send('OK');
});

// // ROUTER: /api/video-games
// router.use('/video-games', require('./videoGames'));

// ROUTER: /api/board-games
router.use('/games', require('./games'));
router.use('/auth', require('./auth'));
router.use('/votes', require('./votes'));
module.exports = router;
