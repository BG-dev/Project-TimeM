const db = require("./models");
const BoardUser = db.BoardUser;

exports.addUser = async (boardId, userId, role) => {
  await BoardUser.create({
    boardId,
    userId,
    role,
  });
};

exports.updateRole = async (id, role) =>
  await BoardUser.update({ role }, { where: { boardUserId: id } });

exports.delete = async (id) =>
  await BoardUser.destroy({ where: { boardUserId: id } });

exports.getOne = async (id) => await BoardUser.findByPk(id);
