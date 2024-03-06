const express = require('express');
const sectionController = require('../controllers/section');
const verifyJWT = require('../middlewares/verifyJWT');

const router = express.Router();

router.get('/:id', verifyJWT, sectionController.getOne);

router.post('/', verifyJWT, sectionController.create);

router.put('/:id', verifyJWT, sectionController.update);

router.delete('/:id', verifyJWT, sectionController.delete);

module.exports = router;
