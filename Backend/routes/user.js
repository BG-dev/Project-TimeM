const express = require("express");
const userController = require("../controllers/user");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get("/contacts", verifyJWT, userController.getContacts);
router.get("/requests", verifyJWT, userController.getRequests);
router.get("/search", verifyJWT, userController.getAll);
router.get("/:id", verifyJWT, userController.getOne);
router.post("/is-contact", verifyJWT, userController.isContact);
router.post("/request", verifyJWT, userController.sendRequest);
router.post("/accept-request", verifyJWT, userController.acceptRequest);
router.post("/deny-request", verifyJWT, userController.denyRequest);

module.exports = router;
