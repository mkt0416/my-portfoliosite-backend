
const router = require("express").Router();
const mapControllers = require("../controllers/map");
const tokenHandler = require("../handlers/tokenHandler");

// 全作業日報を取得
router.get("/", tokenHandler.verifyToken, mapControllers.readAllWorks);

// 個別作業日報を取得
router.get("/:siteId", tokenHandler.verifyToken, mapControllers.readSingleWork);

// 作業日報作成
router.post("/", tokenHandler.verifyToken, mapControllers.createWork);

// 作業日報編集
router.put("/:siteId", tokenHandler.verifyToken, mapControllers.updateWork);

// 作業日報削除
router.delete("/:siteId", tokenHandler.verifyToken, mapControllers.deleteWork);

module.exports = router;