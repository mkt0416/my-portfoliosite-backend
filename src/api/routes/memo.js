
const router = require('express').Router();
const memoControllers = require('../controllers/memo');
const tokenHandler = require('../handlers/tokenHandler');

// メモの並びを更新
router.post("/reorder", tokenHandler.verifyToken, memoControllers.reorderPosition);

// ログインしているユーザーのメモを全て取得
router.get("/", tokenHandler.verifyToken, memoControllers.getAllMemos);

// ログインしているユーザーのメモを一つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoControllers.getSingleMemo);

// メモの作成
router.post("/", tokenHandler.verifyToken, memoControllers.createMemo);

// メモの更新
router.put("/:memoId", tokenHandler.verifyToken, memoControllers.updateMemo);

// メモの更新
router.delete("/:memoId", tokenHandler.verifyToken, memoControllers.deleteMemo);

module.exports = router;