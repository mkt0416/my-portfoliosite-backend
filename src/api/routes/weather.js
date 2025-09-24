
const router = require("express").Router();
const weatherControllers = require("../controllers/weather");

router.get("/", weatherControllers.getWeather);

module.exports = router;