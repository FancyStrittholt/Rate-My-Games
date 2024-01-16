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

async function getGameById(id) {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
            SELECT * FROM games
            WHERE id = $1;
        `,
      [id]
    );
    return game;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllGames,
  getGameById
};
