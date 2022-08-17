const express = require("express");
const logger = require("../middlewares/logger");
const taskController = require("../../controllers/task");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("list id is undefined");
    const task = await taskController.getOne(id);
    const message = "Task successfully got";
    logger.info(message);
    res.status(200).send({
      task,
      message,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", verifyJWT, async (req, res, next) => {
  try {
    const taskData = { ...req.body, user: req.user.id };
    if (!taskData) throw new Error("task is undefined");
    const task = await taskController.create(taskData);
    const message = "Task successfully added to the database";
    logger.info(message);
    res.status(200).send({
      task,
      message,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const taskData = req.body;
    if (!taskData || !id) throw new Error("data is undefined");
    const task = await taskController.update(id, taskData);
    const message = "Task successfully updated in the database";
    logger.info(message);
    res.status(200).send({
      task,
      message,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/updateposition", async (req, res, next) => {
  try {
    const taskData = req.body;
    if (!taskData) throw new Error("data is undefined");
    await taskController.updatePosition(taskData);
    const message = "Task successfully updated in the database";
    logger.info(message);
    res.status(200).send({
      message,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("id is undefined");

    await taskController.delete(id);
    const message = "Task has been deleted";
    logger.info(message);
    res.status(200).send({
      message,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
