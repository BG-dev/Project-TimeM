const express = require("express");
const logger = require("../middlewares/logger");
const {
  createBoard,
  updateBoard,
  deleteBoard,
  getUserBoards,
  getBoardById,
} = require("../../controllers/boardController");

const verifyJWT = require("../middlewares/verifyJWT");
const { getAllBoardsDB } = require("../../integration/boardIntegration");

const router = express.Router();

router.get("/getboard/:id", verifyJWT, async (req, res, next) => {
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

router.get("/getUserBoards", verifyJWT, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const boards = await getUserBoards(userId);

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

router.get("/getAllBoards", verifyJWT, async (req, res, next) => {
  try {
    const boards = await getAllBoardsDB();

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

router.post("/", verifyJWT, async (req, res, next) => {
  try {
    const boardData = {
      ...req.body,
      creator: req.user.id,
    };
    if (!boardData) throw new Error("board data is undefined");
    const board = await createBoard(boardData);
    const message = "Board successfully added to the database";
    logger.info(message);
    res.status(200).send({
      board,
      message,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyJWT, async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const board = req.body;
    if (!board || !boardId) throw new Error("data is undefined");

    await updateBoard(boardId, board);
    const message = "Board successfully updated in the database";
    logger.info(message);
    res.status(200).send({ message });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyJWT, async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const userId = req.user.id;
    if (!boardId) throw new Error("id is undefined");

    await deleteBoard(boardId, userId);
    const message = "Board has been deleted";
    logger.info(message);
    res.status(200).send({ message });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
