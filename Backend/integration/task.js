const Task = require("./models/Task");

const taskIntegration = {
  create: async (data) => await Task.create({ ...data }),
  update: async (id, data) => await Task.findByIdAndUpdate(id, data),
  updatePosition: async (id, data) =>
    await Task.findByIdAndUpdate(id, {
      $set: { status: data.status, position: data.position },
    }),
  delete: async (id) => await Task.findByIdAndDelete(id),
  deleteBoardTasks: async (id) => await Task.deleteMany({ board: id }),
  getOne: async (id) => await Task.findById(id),
  getAll: async () => await Task.find(),
  getBoardTasks: async (id) => await Task.find({ board: id }),
  getUserTasks: async (id) => await Task.find({ user: id }),
};

module.exports = taskIntegration;
