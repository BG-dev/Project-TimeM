const boardIntegration = require("../integration/board");
const userIntegration = require("../integration/user");
const taskIntegration = require("../integration/task");

exports.create = async (newBoardData) => {
  const newBoard = await boardIntegration.create(newBoardData);
  console.log(newBoard);
  // await userIntegration.addBoard(newBoard._id, newBoard.creator);
  return newBoard;
};

exports.update = async (boardId, newBoardData) =>
  await boardIntegration.update(boardId, newBoardData);

exports.delete = async (boardId, userId) => {
  await boardIntegration.delete(boardId);
  await userIntegration.deleteBoard(boardId, userId);
  await taskIntegration.deleteBoardTasks(boardId);
};

exports.getUserBoards = async (userId) =>
  await userIntegration.getBoards(userId);

exports.getOne = async (boardId) => {
  const boardData = (await boardIntegration.getOne(boardId)).toJSON();
  const tasks = await taskIntegration.getBoardTasks(boardId);
  const taskLists = [];
  boardData.lists.forEach((list) => {
    filteredTasks = tasks
      .filter((task) => task.status === list)
      .sort((a, b) => a.position - b.position);
    taskLists.push({
      status: list,
      tasks: filteredTasks,
    });
  });
  boardData.tasks = taskLists;
  return boardData;
};
