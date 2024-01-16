const express = require('express');
const router = express.Router();

const { upVote, downVote, getVotesById, getVotesByUserId } = require('../db/sqlHelperFunctions/votes');

router.post('/:id/up', async (req, res, next) => {
  try {
    const vote = await upVote(req.body.userid, req.params.id);
    res.send(vote);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/down', async (req, res, next) => {
    try {
      const vote = await downVote(req.body.userid, req.params.id);
      res.send(vote);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const votes = await getVotesById(req.params.id);
      res.send(votes);
    } catch (error) {
      next(error);
    }
  });

  router.get('/mine/:id', async (req, res, next) => {
    try {
      const votes = await getVotesByUserId(req.params.id);
      res.send(votes);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
