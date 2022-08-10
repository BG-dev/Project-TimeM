const Task = require("./models/Task");

const addTaskDB = async (taskData) => await Task.create({ ...taskData });

const updateTaskDB = async (taskId, taskData) =>
  await Task.findByIdAndUpdate(taskId, taskData);

const deleteTaskDB = async (taskId) => await Task.findByIdAndDelete(taskId);

const deleteTasksFromBoardDB = async (boardId) => {
  await Task.deleteMany({ board: boardId });
};

const getTaskById = async (taskId) => await Task.findById(taskId);

const getBoardTasksDB = async (boardId) => await Task.find({ board: boardId });

module.exports = {
  addTaskDB,
  updateTaskDB,
  deleteTaskDB,
  getTaskById,
  getBoardTasksDB,
  deleteTasksFromBoardDB,
};
