const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_Key);
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  const id = jwt.verify(token, process.env.JWT_KEY, (err, data) => {
    if (err) return (req.err = err);

    req.unique_id = data.unique_id;
  });
  next();
};
module.exports = { generateToken, verifyToken };
