const client = require('../client');
const util = require('util');

async function getLeaderboard(tag) {
  try {
    const returnList = [];

    if (tag === 'overall') {
      const { rows: votes } = await client.query('SELECT * FROM votes');
      const { rows: games } = await client.query('SELECT * FROM games');
      for (const game of games) {
        if (returnList.find((it) => it.gameid === game.id) === undefined) {
          returnList.push({ ...game, votes: votes.filter((it) => it.gameid === game.id).length });
        }
      }
    } else {
      const { rows: votes } = await client.query('SELECT * FROM votes');
      const { rows: games } = await client.query('SELECT * FROM games');
      const { rows: tags } = await client.query('SELECT * FROM tags WHERE name = $1', [tag]);

      for (const game of games) {
        const notAdded = returnList.find((it) => it.gameid === game.id) === undefined;
        const hasTag = tags.find((it) => it.gameid === game.id) !== undefined;

        if (notAdded & hasTag) {
          returnList.push({ ...game, votes: votes.filter((it) => it.gameid === game.id).length });
        }
      }
    }

    return returnList.sort((a, b) => b.votes - a.votes);
  } catch (error) {
    throw new Error('Unable to retrieve games');
  }
}

module.exports = {
  getLeaderboard,
};
