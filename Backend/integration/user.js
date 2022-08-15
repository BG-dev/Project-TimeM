const User = require("./models/User");

exports.getOne = async (id) => await User.findById(id);

exports.getOneBy = async (data) => await User.findOne({ ...data });

exports.getAll = async () => await User.find();

exports.create = async (data) => await User.create({ ...data });

exports.deleteBoard = async (boardId, userId) => {
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

exports.addBoard = async (boardId, userId) => {
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

exports.getBoards = async (id) => {
  const user = await User.findById(id).populate({
    path: "boards",
    populate: {
      path: "creator",
    },
  });
  return user.boards;
};
