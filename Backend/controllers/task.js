const taskIntegration = require("../integration/task");

exports.create = async (data) => await taskIntegration.create(data);

exports.update = async (id, data) => await taskIntegration.update(id, data);

exports.delete = async (id) => await taskIntegration.delete(id);

exports.getOne = async (id) => await taskIntegration.getOne(id);

exports.getBoardTasks = async (id) => await taskIntegration.getBoardTasks(id);

exports.getUserTasks = async (id) => await taskIntegration.getUserTasks(id);
