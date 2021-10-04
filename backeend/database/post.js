const con = require("./config");
const { followInfo, iFollow } = require("./user");

const create = (postId, userId, content, image, date) => {
  return new Promise((resolve, reject) => {
    const query = `
        INSERT INTO posts
        VALUES (
          DEFAULT, ?, ?, ?, ?,  0, 0, 0, ?
        )
      `;

    con.query(
      query,
      [postId, userId, content, image, date],
      (err, result, fields) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

const allPostsOf = (unique_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM posts
      WHERE user_id=?
    `;

    con.query(query, [unique_id], (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const newsFeed = async (unique_id) => {
  const data = await iFollow(unique_id);

  const posts = await Promise.all(
    data.map(async (d) => {
      const data = await allPostsOf(d.followee_id);
      return data[0];
    })
  );

  return posts;
};

module.exports = { create, allPostsOf, newsFeed };
