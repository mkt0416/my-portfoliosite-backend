
const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const uploadControllers = require('../controllers/upload');

router.post('/', upload.single('file'), uploadControllers.uploadImage);

module.exports = router;