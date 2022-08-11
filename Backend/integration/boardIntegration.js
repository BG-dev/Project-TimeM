const Board = require("./models/Board");

const addBoardDB = async (boardData) => await Board.create({ ...boardData });

const updateBoardDB = async (boardId, boardData) =>
  await Board.findByIdAndUpdate(boardId, boardData);

const deleteBoardDB = async (boardId) => await Board.findByIdAndDelete(boardId);

const getBoardByIdDB = async (boardId) => await Board.findById(boardId);

const getAllBoardsDB = async () => await Board.find();

module.exports = {
  addBoardDB,
  updateBoardDB,
  deleteBoardDB,
  getAllBoardsDB,
  getBoardByIdDB,
};
