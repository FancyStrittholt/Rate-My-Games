const express = require('express');
const router = express.Router();

const { updatePic, updateUsername, updateEmail } = require('../db/sqlHelperFunctions/user');

router.patch('/pic', async (req, res, next) => {
  try {
    const user = await updatePic(req.headers.authorization.replace('Bearer ', ''), req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.patch('/username', async (req, res, next) => {
  try {
    const user = await updateUsername(req.headers.authorization.replace('Bearer ', ''), req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.patch('/email', async (req, res, next) => {
  try {
    const user = await updateEmail(req.headers.authorization.replace('Bearer ', ''), req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
