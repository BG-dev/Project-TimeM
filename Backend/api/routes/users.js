const express = require("express");
const { getAllUsers } = require("../../integration/userIntegration");
const { findUserById } = require("../../controllers/userController");

const router = express.Router();

router.get("/getUsers", (req, res) => {
  const users = getAllUsers();
  res.send(users);
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = findUserById(userId);
  res.send(user.name);
});

module.exports = router;
