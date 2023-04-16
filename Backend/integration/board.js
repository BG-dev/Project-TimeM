const db = require("./models");
const Board = db.Board;

const boardIntegration = {
  create: async (data) => await Board.create({ ...data }),
  update: async (id, data) =>
    await Board.update({ ...data }, { where: { boardId: id } }),
  delete: async (id) => await Board.destroy({ where: { boardId: id } }),
  getOne: async (id) => await Board.findOne({ where: { boardId: id } }),
  getAll: async () => await Board.findAll(),
};

module.exports = boardIntegration;
