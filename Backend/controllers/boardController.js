const {
  addBoardDB,
  updateBoardDB,
  deleteBoardDB,
} = require("../integration/boardIntegration");
const {
  addBoardToUserDB,
  deleteBoardInUserDB,
} = require("../integration/userIntegration");
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

async function deleteBoard(boardId, userId) {
  await deleteBoardDB(boardId);
  await deleteBoardInUserDB(boardId, userId);
}

module.exports = {
  createBoard,
  updateBoard,
  deleteBoard,
};
