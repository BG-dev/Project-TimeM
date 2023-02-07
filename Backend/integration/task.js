const db = require("./models");
const Task = db.Task;

exports.create = async (data) => await Task.create({ ...data });

exports.updateRole = async (id, role) =>
  await Task.update({ role }, { where: { taskId: id } });

exports.delete = async (id) => await Task.destroy({ where: { taskId: id } });

exports.getOne = async (id) => await Task.findByPk(id);
