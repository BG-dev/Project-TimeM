const express = require("express");
const sectionController = require("../controllers/section");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

// router.get("/:id", verifyJWT, sectionController.getOne);

// router.get("/userboards", verifyJWT, boardController.getUserBoards);

router.post("/", verifyJWT, sectionController.create);

// router.put("/:id", verifyJWT, boardController.update);

// router.delete("/:id", verifyJWT, boardController.delete);

module.exports = router;
