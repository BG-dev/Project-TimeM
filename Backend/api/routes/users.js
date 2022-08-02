const express = require("express");
const { getAllUsersDB } = require("../../integration/userIntegration");
const verifyJWT = require("../middlewares/verifyJWT");
const logger = require("../middlewares/logger");

const router = express.Router();

router.get("/getAllUsers", verifyJWT, async (req, res, next) => {
  try {
    const users = await getAllUsersDB();

    const message = "Users successfully got";
    logger.info(message);
    res.status(200).send({
      users,
      message,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
