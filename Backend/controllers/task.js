const taskIntegration = require("../integration/task");

exports.create = async (data) => await taskIntegration.create(data);

exports.update = async (id, data) => await taskIntegration.update(id, data);

exports.updatePosition = async (data) => {
  const { resourceTasks, destinationTasks, resourceStatus, destinationStatus } =
    data;
  if (resourceStatus !== destinationStatus) {
    resourceTasks.forEach(async (task, index) => {
      await taskIntegration.updatePosition(task._id, {
        status: resourceStatus,
        position: index,
      });
    });
  }
  destinationTasks.forEach(async (task, index) => {
    console.log(task, index);
    await taskIntegration.updatePosition(task._id, {
      status: destinationStatus,
      position: index,
    });
  });
};

exports.delete = async (id) => await taskIntegration.delete(id);

exports.getOne = async (id) => await taskIntegration.getOne(id);

exports.getBoardTasks = async (id) => await taskIntegration.getBoardTasks(id);

exports.getUserTasks = async (id) => await taskIntegration.getUserTasks(id);
