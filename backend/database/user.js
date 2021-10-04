const con = require("./config");

//boolean

//user

const isEmailExist = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT email FROM users WHERE email=? `;

    con.query(query, [email], (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const isUsernameExist = (username) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT username FROM users WHERE username=?`;

    con.query(query, [username], (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

//writing to
//user

const getUserById = (unique_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM users
      WHERE unique_id=?
    `;

    con.query(query, [unique_id], (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const isFollowed = (me, followId) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT * FROM follow
    WHERE follower_id=? AND followee_id=?
    `;

    con.query(query, [me, followId], (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
const follow = (me, followId) => {
  return new Promise((resolve, reject) => {
    const date = new Date().getTime();
    const query = `
    INSERT INTO follow
    VALUES (
      DEFAULT, ?, ?, ?
    )
  `;

    con.query(query, [me, followId, date], (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const unfollow = (me, followId) => {
  return new Promise((resolve, reject) => {
    const query = `
    DELETE FROM follow
    WHERE follower_id=? AND followee_id=?
    `;

    con.query(query, [me, followId], (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const iFollow = (unique_id) => {
  return new Promise((resolve, reject) => {
    const iFollowQuery = `
      SELECT * FROM follow
      WHERE follower_id=?
    `;

    con.query(iFollowQuery, [unique_id], (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const followMe = (unique_id) => {
  return new Promise((resolve, reject) => {
    const iFollowQuery = `
      SELECT * FROM follow
      WHERE followee_id=?
    `;

    con.query(iFollowQuery, [unique_id], (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = {
  isEmailExist,
  isUsernameExist,
  getUserById,
  isFollowed,
  follow,
  unfollow,
  iFollow,
  followMe,
};
