const db = require("./models");
const Task = db.Task;

exports.create = async (data) => await Task.create({ ...data });

exports.updateRole = async (id, role) =>
  await Task.update({ role }, { where: { task_id: id } });

exports.delete = async (id) =>
  await Task.destroy({ where: { task_id: id } });

exports.getOne = async (id) => await Task.findByPk(id);
