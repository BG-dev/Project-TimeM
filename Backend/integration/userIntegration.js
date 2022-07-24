const User = require("../integration/models/User");

const findUser = async (user) =>
  await User.findOne({
    $or: [
      {
        username: user.username,
      },
      {
        email: user.email,
      },
    ],
  });

const findUserByUsername = async (username) =>
  await User.findOne({
    username,
  });

const createUser = async (newUser) => await User.create({ ...newUser });

module.exports = {
  findUser,
  findUserByUsername,
  createUser,
};
