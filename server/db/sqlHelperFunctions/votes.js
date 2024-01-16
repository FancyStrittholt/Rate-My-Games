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

async function getVotes() {
  try {
    const { rows: votes } = await client.query('SELECT * FROM votes', []);

    const returnList = [];

    for (const vote of votes) {
      if (returnList.find((it) => it.gameid === vote.gameid) === undefined) {
        returnList.push({ gameid: vote.gameid, votes: votes.filter((it) => it.gameid === vote.gameid).length });
      }
    }

    return returnList;
  } catch (error) {
    throw error;
  }
}

async function getVotesByUserId(userid) {
  try {
    const { rows: votes } = await client.query('SELECT * FROM votes WHERE userid=$1', [userid]);
    return votes;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  upVote,
  downVote,
  getVotes,
  getVotesByUserId,
};
