const express = require('express');
const boardController = require('../controllers/board');
const verifyJWT = require('../middlewares/verifyJWT');

const router = express.Router();

router.get('/board/:id', verifyJWT, boardController.getOne);
router.get('/userboards', verifyJWT, boardController.getUserBoards);
router.post('/', verifyJWT, boardController.create);
router.post('/adduser', verifyJWT, boardController.addUserToBoard);
router.put('/:id', verifyJWT, boardController.update);
router.delete('/:id', verifyJWT, boardController.delete);

module.exports = router;
