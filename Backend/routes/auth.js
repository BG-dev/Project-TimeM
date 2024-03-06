const express = require('express');
const authController = require('../controllers/user');
const verifyJWT = require('../middlewares/verifyJWT');

const router = express.Router();

router.get('/isAuthUser', verifyJWT, (req, res) => {
    return res.json({ isLoggedIn: true, user: req.user });
});

router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;
