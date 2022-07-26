const express = require("express");
const authController = require("../../controllers/auth");
const logger = require("../middlewares/logger");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get("/isAuthUser", verifyJWT, (req, res) => {
  return res.json({ isLoggedIn: true, username: req.user.username });
});

router.post("/register", async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await authController.create(user);
    const message = `User ${newUser.username} was created`;
    logger.info(message);
    res.status(201).send({ message });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = req.body;
    const token = await authController.login(user);
    const message = `User ${user.username} was logged in`;
    logger.info(message);
    res.status(201).send({
      token,
      username: user.username,
      message,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
