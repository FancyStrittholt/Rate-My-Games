const express = require('express');
const router = express.Router();

const { getAllGames, getGameById } = require('../db/sqlHelperFunctions/games');

router.get('/', async (req, res, next) => {
  try {
    const games = await getAllGames();
    res.send(games);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const game = await getGameById(req.params.id);
    res.send(game);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
