const User = require("./models/User");

const findUserByDB = async (userData) =>
  await User.findOne({
    ...userData,
  });

const addUserDB = async (userData) => await User.create({ ...userData });

const addBoardToUserDB = async (boardId, userId) => {
  if (!boardId) throw new Error("Board id is undefined");
  if (!userId) throw new Error("User id is undefined");

  await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        boards: boardId,
      },
    },
    {
      upsert: true,
    }
  );
};

const deleteBoardInUserDB = async (boardId, userId) => {
  if (!boardId) throw new Error("Board id is undefined");
  if (!userId) throw new Error("User id is undefined");

  await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        boards: boardId,
      },
    },
    {
      upsert: true,
    }
  );
};

const getAllUsersDB = async () => await User.find();

const getUserBoardsDB = async (userId) => {
  const user = await User.findById(userId).populate({
    path: "boards",
    populate: {
      path: "creator",
    },
  });
  return user.boards;
};

module.exports = {
  findUserByDB,
  addUserDB,
  getAllUsersDB,
  addBoardToUserDB,
  deleteBoardInUserDB,
  getUserBoardsDB,
};
