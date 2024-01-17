const express = require('express');
const router = express.Router();

const { getLeaderboard } = require('../db/sqlHelperFunctions/leaderboard');

router.get('/', async (req, res, next) => {
  try {
    const leaderboard = await getLeaderboard(req.query.tag);
    res.send(leaderboard);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
