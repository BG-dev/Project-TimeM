const db = require("./models");
const Board = db.Board;

exports.create = async (data) => await Board.create({ ...data });

exports.update = async (id, data) =>
  await Board.update({ ...data }, { where: { boardId: id } });

exports.delete = async (id) => await Board.destroy({ where: { boardId: id } });

exports.getOne = async (id) => await Board.findByPk(id);
