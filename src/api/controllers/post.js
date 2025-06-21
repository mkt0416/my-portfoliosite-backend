
const User = require('../models/user');
const Post = require('../models/post');

exports.createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (req.body.userId === post.userId) {
            await post.updateOne({
                $set: req.body,
            });
        } else {
            return res.status(403).json({ message: 'あなたは他の人の投稿を編集できません' });
        }
        return res.status(200).json({ message: '投稿編集に成功しました！' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (req.body.userId === post.userId) {
            await post.deleteOne();
        } else {
            return res.status(403).json({ message: 'あなたは他の人の投稿を削除できません' });
        }
        return res.status(200).json({ message: '投稿削除に成功しました！' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //まだ投稿にいいねが押されていなかったら
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json({ message: '投稿にいいねを押しました！' });
        } else {
            //投稿にすでにいいねが押されていたら
            await post.updateOne({
                $pull: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json({ message: '投稿にいいねを外しました！' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(200).json(err);
    }
};

exports.getTimelinePosts = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        //ユーザーがフォローしている友達の投稿内容を全て取得する
        const friendsPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            }),
        );
        return res.status(200).json(userPosts.concat(...friendsPosts));
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.getProfileTimeline = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        return res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.creatComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.body.userId);
        const newPost = {
            userId: user._id,
            username: user.username,
            text: req.body.text,
        };
        post.comments.push(newPost);
        await post.save();
        return res.status(200).json({ message: 'コメントを投稿しました' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.getComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post.comments);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.id(req.params.commentId);
        if (comment.userId === req.body.userId) {
            post.comments.pull(req.params.commentId);
            await post.save();
            return res.status(200).json({ message: 'コメントを削除しました' });
        } else {
            return res.status(200).json({ message: '他の人のコメントを削除できません' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};