
const router = require('express').Router();
const legoControllers = require("../controllers/lego");

// テーマを取得
router.get("/theme", legoControllers.getTheme);

// テーマからセットを取得
router.get("/sets", legoControllers.getSets);

// 個別のセットを取得
router.get("/sets/:setNum", legoControllers.getSingleSets);

// キーワード検索でセットを取得
router.get("/search/sets", legoControllers.searchSets);

// テーマからミニフィグを取得　
router.get("/minifigs", legoControllers.getMinfigsByTheme);

// 個別のミニフィグを取得
router.get("/minifigs/:figNum", legoControllers.getSingleMinifigs);

// キーワード検索でミニフィグを取得
router.get("/search/minifigs", legoControllers.searchFigs);

// テーマからパーツを取得　
router.get("/parts", legoControllers.getPartsByTheme);

// 個別のテーマを取得
router.get("/parts/:partNum", legoControllers.getSingleParts);

// キーワード検索でミニフィグを取得
router.get("/search/parts", legoControllers.searchParts);

// ランダムなセットを取得
router.get("/random/sets", legoControllers.getRandomSets);

// ランダムなミニフィグを取得
router.get("/random/minifigs", legoControllers.getRandomFigs);

module.exports = router;