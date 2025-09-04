
const Memo = require("../models/memo");

exports.getAllMemos = async (req, res) => {
    try {
        const memos = await Memo.find({
            user: req.user._id
        }).sort("position");
        return res.status(200).json(memos);
    } catch (err) {
        console.lgo(err);
        return res.status(500).json(err);
    }
};

exports.getSingleMemo = async (req, res) => {
    try {
        const { memoId } = req.params;
        const memo = await Memo.findOne({
            user: req.user._id,
            _id: memoId
        });
        if (!memo) return res.status(404).json("メモが存在しません");
        return res.status(200).json(memo);
    } catch (err) {
        console.lgo(err);
        return res.status(500).json(err);
    }
};

exports.createMemo = async (req, res) => {
    try {
        const memo = await Memo.create({
            user: req.user._id,
        });
        return res.status(201).json(memo);
    } catch (err) {
        console.lgo(err);
        return res.status(500).json(err);
    }
};

exports.updateMemo = async (req, res) => {
    try {
        const { memoId } = req.params;
        const { title, description } = req.body;
        if (title === "") req.body.title = "No Title";
        if (description === "") req.body.description = "No Description";
        const memo = await Memo.findOne({
            user: req.user._id,
            _id: memoId
        });
        if (!memo) return res.status(404).json("メモが存在しません");
        const updateMemo = await Memo.findOneAndUpdate({ _id: memoId }, req.body);
        return res.status(200).json(updateMemo);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.deleteMemo = async (req, res) => {
    try {
        const { memoId } = req.params;
        const memo = await Memo.findOne({
            user: req.user._id,
            _id: memoId
        });
        if (!memo) return res.status(404).json("メモが存在しません");
        await Memo.findOneAndDelete({ _id: memoId });
        return res.status(200).json("メモを削除しました");
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.reorderPosition = async (req, res) => {
    try {
        const { updatePosition } = req.body;
        const updatePromises = updatePosition.map((item) =>
            Memo.findOneAndUpdate(
                { _id: item._id, user: req.user._id },
                { position: item.position },
            ),
        );
        await Promise.all(updatePromises);
        return res.status(200).json("メモの並びを更新しました");
    } catch (err) {
        console.log(err);
    }
};
