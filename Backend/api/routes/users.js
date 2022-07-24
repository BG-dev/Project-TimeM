const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { findUserById } = require("../../service/userService");

const router = express.Router();

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = findUserById(userId);
  res.send(user.name);
});

module.exports = router;
