const { isUsernameExist, isEmailExist } = require("../database/queries");

const rand = (length = 30) => {
  const alphaNum =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let random = "";

  for (let i = 0; i < length; i++) {
    random += alphaNum[Math.trunc(Math.random() * 62)];
  }
  return random;
};

const randNum = (upto) => {
  return Math.trunc(Math.random() * upto);
};

const genUsername = async (name) => {
  for (let i = 0; i < 10; i++) {
    try {
      const isExist = await isUsernameExist(name);

      if (isExist.length > 0) return name + randNum(10000);
      else return name;
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { rand, genUsername };
