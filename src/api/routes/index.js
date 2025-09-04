
const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
router.use('/posts', require('./post'));
router.use('/memo', require('./memo'));
router.use('/music', require('./music'));
router.use('/upload', require('./uploard'));
router.use('/chat', require('./chat'));

module.exports = router;