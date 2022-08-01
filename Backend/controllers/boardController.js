const { addBoard, getAllBoards } = require("../integration/boardIntegration");
// const { validateBoard } = require("../service/validators/boardValidator");

async function createBoard(newBoardData) {
  // const { error } = validateBoard(newBoardData);
  // if (error) throw new Error(error.details[0].message);
  await addBoard(newBoardData);
}

async function getBoards() {
  const boards = await getAllBoards();

  return boards;
}

module.exports = {
  createBoard,
  getBoards,
};
