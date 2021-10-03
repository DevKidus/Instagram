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

const signup = (
  { email, firstname, lastname, password },
  unique_id,
  username
) => {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO users
    VALUES (
        DEFAULT,
        ?, ?, ?, ?, ?, ?, 'online', ?
    )
`;
    const date = new Date().getTime();

    con.query(
      query,
      [unique_id, firstname, lastname, username, email, password, date],
      (err, result, fields) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

module.exports = { isEmailExist, isUsernameExist, signup };
