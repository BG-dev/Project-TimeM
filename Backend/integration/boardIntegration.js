const Board = require("./models/Board");

const addBoard = async (boardData) => await Board.create({ ...boardData });

const getAllBoards = async () => await Board.find();

module.exports = {
  addBoard,
  getAllBoards,
};
