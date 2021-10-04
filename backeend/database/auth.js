const con = require("./config");

const signup = (
  { email, firstname, lastname, password, profile_img, bio },
  unique_id,
  username
) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users
      VALUES (
          DEFAULT,
          ?, ?, ?, ?, ?, ?, ?, ?, 'online', ?
      )
  `;
    const date = new Date().getTime();

    con.query(
      query,
      [
        unique_id,
        firstname,
        lastname,
        username,
        email,
        password,
        profile_img,
        bio,
        date,
      ],
      (err, result, fields) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM users
        WHERE email=? AND password=?
      `;

    con.query(query, [email, password], (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = { signup, login };
