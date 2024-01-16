const client = require('../client');
const util = require('util');

async function upVote(userid, gameid) {
  try {
    const {
        rows: [vote],
      } = await client.query('INSERT INTO votes (userid, gameid) VALUES ($1, $2) RETURNING *', [userid, gameid]);
    return vote;
  } catch (error) {
    throw error;
  }
}

async function downVote(userid, gameid) {
    try {
      const {
        rows: [vote],
      } = await client.query('DELETE FROM votes WHERE userid=$1 AND gameid=$2 RETURNING *', [userid, gameid]);
      return vote;
    } catch (error) {
      throw error;
    }
  }

  async function getVotesById(gameid) {
    try {
      const {
        rows: votes,
      } = await client.query('SELECT COUNT (*) FROM votes WHERE gameid=$1', [gameid]);
      return votes;
    } catch (error) {
      throw error;
    }
  }

  async function getVotesByUserId(userid) {
    try {
      const {
        rows: votes,
      } = await client.query('SELECT * FROM votes WHERE userid=$1', [userid]);
      return votes;
    } catch (error) {
      throw error;
    }
  }
  
module.exports = {
  upVote,
  downVote,
  getVotesById,
  getVotesByUserId
};
