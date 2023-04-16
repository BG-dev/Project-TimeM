const db = require("./models");
const List = db.List;

exports.create = async (data) => await List.create({ ...data });

exports.update = async (id, data) =>
  await List.update({ ...data }, { where: { list_id: id } });

exports.delete = async (id) => await List.destroy({ where: { list_id: id } });

exports.getOne = async (id) => await List.findByPk(id);
