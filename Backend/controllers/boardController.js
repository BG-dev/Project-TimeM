const {
  addBoardDB,
  updateBoardDB,
} = require("../integration/boardIntegration");
const { addBoardToUserDB } = require("../integration/userIntegration");
// const { validateBoard } = require("../service/validators/boardValidator");

async function createBoard(newBoardData) {
  // const { error } = validateBoard(newBoardData);
  // if (error) throw new Error(error.details[0].message);
  const newBoard = await addBoardDB(newBoardData);
  await addBoardToUserDB(newBoard._id, newBoard.creator);
}

async function updateBoard(boardId, newBoardData) {
  // const { error } = validateBoard(newBoardData);
  // if (error) throw new Error(error.details[0].message);
  await updateBoardDB(boardId, newBoardData);
}

module.exports = {
  createBoard,
  updateBoard,
};
