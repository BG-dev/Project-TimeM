const userIntegration = require("../integration/user");

exports.getOne = async (id) => await userIntegration.getOne(id);

exports.getAll = async () => await userIntegration.getAll();
