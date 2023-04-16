const Board = require("./models/Board");

const boardIntegration = {
  create: async (data) => await Board.create({ ...data }),
  update: async (id, data) => await Board.findByIdAndUpdate(id, data),
  delete: async (id) => await Board.findByIdAndDelete(id),
  getOne: async (id) => await Board.findById(id),
  getAll: async () => await Board.find(),
};

module.exports = boardIntegration;
