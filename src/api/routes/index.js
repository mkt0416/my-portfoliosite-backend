
const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
router.use('/posts', require('./post'));
router.use('/memo', require('./memo'));
router.use('/music', require('./music'));
router.use('/upload', require('./uploard'));
router.use('/chat', require('./chat'));
router.use("/weather", require("./weather"));
router.use("/news", require("./news"));
router.use("/reverse-decode", require("./address"));
router.use("/map", require("./map"));
router.use("/lego", require("./lego"));

module.exports = router;