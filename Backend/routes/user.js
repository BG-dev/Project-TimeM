const express = require("express");
const userController = require("../controllers/user");
const verifyJWT = require("../middlewares/verifyJWT");
const logger = require("../middlewares/logger");

const router = express.Router();

// router.get("/getAll", verifyJWT, async (req, res, next) => {
//   try {
//     const users = await userController.getAll();

//     const message = "Users successfully got";
//     logger.info(message);
//     res.status(200).send({
//       users,
//       message,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/:id", verifyJWT, userController.getOne);

module.exports = router;
