const express = require('express');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/user');
const verifyJWT = require('../middlewares/verifyJWT');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.get('/contacts', verifyJWT, userController.getContacts);
router.get('/requests', verifyJWT, userController.getRequests);
router.get('/search', verifyJWT, userController.getAll);
router.get('/:id', verifyJWT, userController.getOne);
router.post('/avatar', upload.single('avatar'), userController.addAvatar);
router.post('/is-contact', verifyJWT, userController.isContact);
router.post('/request', verifyJWT, userController.sendRequest);
router.post('/accept-request', verifyJWT, userController.acceptRequest);
router.post('/deny-request', verifyJWT, userController.denyRequest);
router.delete('/contact/:id', verifyJWT, userController.deleteContact);

module.exports = router;
