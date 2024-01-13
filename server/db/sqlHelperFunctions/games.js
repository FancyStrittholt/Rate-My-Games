const client = require('../client');
const util = require('util');

async function getAllGames() {
  try {
    const { rows: games } = await client.query('select * from games');
    return games;
  } catch (error) {
    throw new Error('Unable to retrieve games');
  }
}

module.exports = {
  getAllGames,
};
