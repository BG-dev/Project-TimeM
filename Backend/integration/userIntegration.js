const User = require("./models/User");

const findUserBy = async (userData) =>
  await User.findOne({
    ...userData,
  });

const addUser = async (userData) => await User.create({ ...userData });

const getAllUsers = async () => await User.find();

module.exports = {
  findUserBy,
  addUser,
  getAllUsers,
};
