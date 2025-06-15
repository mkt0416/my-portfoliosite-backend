
const router = require('express').Router();
const userControllers = require('../controllers/user');

//ユーザー情報の更新
router.put('/:id', userControllers.updateUser);

//ユーザー情報の削除
router.delete('/:id', userControllers.deleteUser);

//クエリでユーザー情報を取得
router.get('/', userControllers.getSingleUser);

//ユーザーのフォロー
router.put('/:id/follow', userControllers.followUser);

//ユーザーのアンフォロー
router.put('/:id/unfollow', userControllers.unfollowUser);

//フォローしているユーザー一覧を取得
router.get('/:id/friends', userControllers.geFollowings);

module.exports = router;