const express = require('express');
const router = express.Router();

const { updatePic, getUser } = require('../db/sqlHelperFunctions/user');

router.patch('/pic', async (req, res, next) => {
  try {
    const user = await updatePic(req.headers.authorization.replace('Bearer ', ''), req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
