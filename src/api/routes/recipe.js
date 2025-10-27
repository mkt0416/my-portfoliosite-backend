
const router = require("express").Router();
const recipeControllers = require("../controllers/recipe");

router.get("/category", recipeControllers.getCategories);

router.post("/ranking", recipeControllers.getRanking);

router.post("/search", recipeControllers.searchRecipe);

module.exports = router;