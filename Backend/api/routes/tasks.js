const express = require("express");
const logger = require("../middlewares/logger");
const {
  createTask,
  getBoardTasks,
} = require("../../controllers/taskController");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("list id is undefined");
    const cards = await getCardsByListId(id);
    const message = "Cards successfully got";
    logger.info(message);
    res.status(200).send({
      cards,
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
    await createTask(taskData);
    const message = "Task successfully added to the database";
    logger.info(message);
    res.status(200).send({ message });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const card = req.body.card;
    if (!card || !id) throw new Error("data is undefined");

    await updateCard(id, card);
    const message = "Card successfully updated in the database";
    logger.info(message);
    res.status(200).send({ message });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("id is undefined");

    await deleteCard(id);
    const message = "Cards has been deleted";
    logger.info(message);
    res.status(200).send({ message });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
