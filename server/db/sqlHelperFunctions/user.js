const client = require('../client');

async function updatePic(token, body) {
  try {
    const {
      rows: [user],
    } = await client.query('SELECT * FROM users WHERE token = $1', [token]);

    if (user.id !== body.id) {
      throw new Error('Invalid user');
    }

    const {
      rows: [updatedUser],
    } = await client.query('UPDATE users SET pic = $1 WHERE id = $2 RETURNING *', [body.pic, body.id]);
    return updatedUser;
  } catch (error) {
    throw new Error('Unable to update user pic');
  }
}

module.exports = {
  updatePic,
};
