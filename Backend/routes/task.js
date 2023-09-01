const express = require("express");
const taskController = require("../controllers/task");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get("/:id", verifyJWT, taskController.getOne);

router.post("/", verifyJWT, taskController.create);

router.put("/update/:id", verifyJWT, taskController.update);

router.put("/updateposition", verifyJWT, taskController.updatePosition);

router.delete("/:id", verifyJWT, taskController.delete);

module.exports = router;
