const db = require("./models");
const BoardUser = db.BoardUser;

exports.addUser = async (data) => await BoardUser.create({ ...data });

exports.updateRole = async (id, role) =>
  await BoardUser.update({ role }, { where: { board_user_id: id } });

exports.delete = async (id) =>
  await BoardUser.destroy({ where: { board_user_id: id } });

exports.getOne = async (id) => await BoardUser.findByPk(id);

module.exports = boardUserIntegration;
