const Board = require("./models/Board");

const addBoardDB = async (boardData) => await Board.create({ ...boardData });

const updateBoardDB = async (boardId, boardData) =>
  await Board.findByIdAndUpdate(boardId, boardData);

const getAllBoardsDB = async () => await Board.find();

module.exports = {
  addBoardDB,
  updateBoardDB,
  getAllBoardsDB,
};
