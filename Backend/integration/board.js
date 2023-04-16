const db = require("./models");
const Board = db.Board;

exports.create = async (data) => await Board.create({ ...data });

exports.update = async (id, data) =>
  await Board.update({ ...data }, { where: { board_id: id } });

exports.delete = async (id) => await Board.destroy({ where: { board_id: id } });

exports.getOne = async (id) => await Board.findByPk(id);
