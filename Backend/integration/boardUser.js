const db = require("./models");
const BoardUser = db.BoardUser;

const boardUserIntegration = {
  addUser: async (data) => await BoardUser.create({ ...data }),
  updateRole: async (id, role) =>
    await BoardUser.update({ role }, { where: { boardUserId: id } }),
  delete: async (id) => await BoardUser.destroy({ where: { boardUserId: id } }),
  getOne: async (id) => await BoardUser.findByPk(id),
  getAll: async () => await BoardUser.findAll(),
};

module.exports = boardUserIntegration;
