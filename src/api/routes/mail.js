
const router = require('express').Router();
const mailControllers = require("../controllers/mail");

router.post("/", mailControllers.sendMail);

module.exports = router;