
const router = require('express').Router();
const addressControllers = require("../controllers/address");

router.get("/", addressControllers.getAddress);

module.exports = router;