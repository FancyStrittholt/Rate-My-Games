const client = require('../client');
const util = require('util');

async function getAllGames() {
  try {
    const { rows: games } = await client.query('SELECT * FROM games ORDER BY name');
    return games;
  } catch (error) {
    throw new Error('Unable to retrieve games');
  }
}

module.exports = {
  getAllGames,
};
