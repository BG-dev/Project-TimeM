const express = require("express");
const logger = require("../middlewares/logger");
const { createBoard, getBoards } = require("../../controllers/boardController");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

// router.get("/:id", verifyJWT, async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const board = await getBoardById(id);

//     const message = "Board successfully got";
//     logger.info(message);
//     res.status(200).send({
//       board,
//       message,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/getAllBoards", verifyJWT, async (req, res, next) => {
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

router.post("/", verifyJWT, async (req, res, next) => {
  try {
    const boardData = {
      ...req.body,
      creator: req.user.id,
    };
    if (!boardData) throw new Error("board data is undefined");
    await createBoard(boardData);
    const message = "Board successfully added to the database";
    logger.info(message);
    res.status(200).send({ message });
  } catch (error) {
    next(error);
  }
});

// router.put("/:id", verifyJWT, async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const board = req.body.board;
//     if (!board || !id) throw new Error("data is undefined");

//     await updateBoard(id, board);
//     const message = "Board successfully updated in the database";
//     logger.info(message);
//     res.status(200).send({ message });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:id", verifyJWT, async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     if (!id) throw new Error("id is undefined");

//     deleteBoard(id);
//     const message = "Board has been deleted";
//     logger.info(message);
//     res.status(200).send({ message });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
