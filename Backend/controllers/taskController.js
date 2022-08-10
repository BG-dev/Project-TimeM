const {
  addTaskDB,
  updateTaskDB,
  deleteTaskDB,
  getBoardTasksDB,
} = require("../integration/taskIntegration");

async function createTask(newTaskData) {
  await addTaskDB(newTaskData);
}

async function updateTask(taskId, newTaskData) {
  await updateTaskDB(taskId, newTaskData);
}

async function deleteTask(taskId) {
  await deleteTaskDB(taskId);
}

async function getBoardTasks(boardId) {
  const tasks = await getBoardTasksDB(boardId);
  return tasks;
}

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getBoardTasks,
};
