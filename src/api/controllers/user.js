
const User = require('../models/user');

exports.updateUser = async (req, res) => {
    if (req.params.id === req.body.userId) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                { new: true },
            );
            return res.status(200).json({ message: 'ユーザー情報が更新されました', user });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json({ message: 'あなたは自分のアカウントの時だけ情報を更新できます' });
    }
};

exports.deleteUser = async (req, res) => {
    if (req.params.id === req.body.userId) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'ユーザー情報が削除されました' });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json({ message: 'あなたは自分のアカウントの時だけ情報を削除できます' });
    }
};

exports.getSingleUser = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username })
        const { password, UpdatedAt, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.followUser = async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id);
            const currnetUser = await User.findById(req.body.userId);
            //フォロワーに自分がいなかったらフォローできる
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: {
                        followers: req.body.userId,
                    },
                });
                await currnetUser.updateOne({
                    $push: {
                        followings: req.params.id,
                    },
                });
                return res.status(200).json({ message: 'フォローに成功しました！' });
            } else {
                return res.status(403).json({ message: 'あなたはすでにこのユーザーをフォローしています' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json({ message: '自分自身をフォローできません' });
    }
};

exports.unfollowUser = async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id);
            const currnetUser = await User.findById(req.body.userId);
            //フォロワーに存在したらフォローを外せる
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId,
                    },
                });
                await currnetUser.updateOne({
                    $pull: {
                        followings: req.params.id,
                    },
                });
                return res.status(200).json({ message: 'フォローを解除しました！' });
            } else {
                return res.status(403).json({ message: 'このユーザーはフォロー解除できません' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json({ message: '自分自身をフォロー解除できません' });
    }
};

exports.geFollowings = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const followings = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        const result = followings.map((friend) => {
            const { _id, username, profilePicture, followers } = friend;
            return { _id, username, profilePicture, followers };
        })
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};