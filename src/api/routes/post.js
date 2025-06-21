
const router = require('express').Router();
const postControllers = require('../controllers/post');

//投稿を作成する
router.post('/', postControllers.createPost);

//投稿を更新する
router.put('/:id', postControllers.updatePost);

//投稿を削除する
router.delete('/:id', postControllers.deletePost);

//ある特定の投稿を取得する
router.get('/:id', postControllers.getSinglePost);

//特定の投稿にいいねを押す
router.put('/:id/like', postControllers.likePost);

//投稿を全て取得する
router.get('/', postControllers.getAllPosts);

//タイムラインの投稿を取得する
router.get('/timeline/:userId', postControllers.getTimelinePosts);

//プロフィール専用のタイムラインの取得
router.get('/profile/:username', postControllers.getProfileTimeline);

//コメントの投稿
router.put('/:id/comment', postControllers.creatComment);

//コメントの取得
router.get('/:id/comments', postControllers.getComments);

//コメントの削除
router.delete('/:id/comment/:commentId', postControllers.deleteComment);

module.exports = router;