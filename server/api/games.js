const express = require('express');
const router = express.Router();

const { getAllGames } = require('../db/sqlHelperFunctions/games');

router.get('/', async (req, res, next) => {
  try {
    const games = await getAllGames();
    res.send(games);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
