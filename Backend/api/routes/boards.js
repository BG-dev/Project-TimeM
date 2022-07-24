const express = require("express");
const { authUser, authRole } = require("../middlewares/auth");
const logger = require("../middlewares/logger");
const {
  getBoardById,
  updateBoard,
  deleteBoard,
  getListsByBoardId,
} = require("../../service/boardService");
const { addBoard, getBoards } = require("../../integration/boardIntegration");

const router = express.Router();

router.get("/:id", authUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const board = await getBoardById(id);

    const message = "Board successfully got";
    logger.info(message);
    res.status(200).send({
      board,
      message,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", authUser, async (req, res, next) => {
  try {
    const boards = await getBoards();

    const message = "Boards successfully got";
    logger.info(message);
    res.status(200).send({
      boards,
      message,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/lists", authUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const boardLists = await getListsByBoardId(id);

    const message = "Board lists successfully got";
    logger.info(message);
    res.status(200).send({
      boardLists,
      message,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", authUser, authRole("admin"), async (req, res, next) => {
  try {
    const boardData = req.body.board;
    if (!boardData) throw new Error("board data is undefined");

    await addBoard(boardData);
    const message = "Board successfully added to the database";
    logger.info(message);
    res.status(200).send({ message });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authUser, authRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;
    const board = req.body.board;
    if (!board || !id) throw new Error("data is undefined");

    await updateBoard(id, board);
    const message = "Board successfully updated in the database";
    logger.info(message);
    res.status(200).send({ message });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authUser, authRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("id is undefined");

    deleteBoard(id);
    const message = "Board has been deleted";
    logger.info(message);
    res.status(200).send({ message });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
