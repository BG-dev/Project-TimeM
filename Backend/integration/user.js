const db = require("./models");
const User = db.User;

exports.create = async (data) => await User.create({ ...data });

exports.update = async (id, data) =>
  await User.update({ ...data }, { where: { user_id: id } });

exports.delete = async (id) => await User.destroy({ where: { user_id: id } });

exports.getOne = async (id) => await User.findByPk(id);

exports.getAll = async () => await User.findAll();
