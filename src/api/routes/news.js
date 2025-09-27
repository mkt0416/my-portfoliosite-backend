
const router = require("express").Router();
const newsControllers = require("../controllers/news");

router.get("/", newsControllers.getNews);

module.exports = router;