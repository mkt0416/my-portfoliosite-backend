
const Map = require("../models/map");

exports.readAllWorks = async (req, res) => {
    try {
        const { start, end, date, keyword } = req.query;
        const query = { user: req.user._id };

        // 期間検索
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);

            endDate.setDate(endDate.getDate() + 1);

            const startUTC = new Date(startDate.getTime() - 9 * 60 * 60 * 1000);
            const endUTC = new Date(endDate.getTime() - 9 * 60 * 60 * 1000);

            query.createdAt = {
                $gte: startUTC,
                $lte: endUTC,
            };
        }

        // 単日検索
        if (date) {
            const start = new Date(date);
            const end = new Date(date);
            end.setDate(end.getDate() + 1);

            const startUTC = new Date(start.getTime() - 9 * 60 * 60 * 1000);
            const endUTC = new Date(end.getTime() - 9 * 60 * 60 * 1000);

            query.createdAt = {
                $gte: startUTC,
                $lte: endUTC,
            };
        }

        // キーワード検索
        if (keyword) {
            query.$or = [
                { province: { $regex: keyword, $options: "i" } },
                { city: { $regex: keyword, $options: "i" } },
                { siteName: { $regex: keyword, $options: "i" } },
                { workDescription: { $regex: keyword, $options: "i" } },
                { neighbourhood: { $regex: keyword, $options: "i" } },
                { feedback: { $regex: keyword, $options: "i" } },
            ];
        }

        const works = await Map.find(query)
            .sort("-createdAt");

        return res.status(200).json(works);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.readSingleWork = async (req, res) => {
    try {
        const { siteId } = req.params;

        const work = await Map.findOne({
            user: req.user._id,
            _id: siteId,
        });
        if (!work) {
            return res.status(404).json("現場が存在しません");
        }
        return res.status(200).json(work);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.createWork = async (req, res) => {
    try {
        const { image,
            province,
            city,
            neighbourhood,
            siteName,
            workDescription,
            feedback, location
        } = req.body;

        const work = await Map.create({
            user: req.user._id,
            province,
            city,
            neighbourhood,
            image,
            siteName: siteName && siteName.trim() !== "" ? siteName : "未記入",
            workDescription: workDescription && workDescription.trim() !== "" ? workDescription : "未記入",
            feedback: feedback && feedback.trim() !== "" ? feedback : "未記入",
            location,
        });
        return res.status(201).json(work);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.updateWork = async (req, res) => {
    try {
        const { siteId } = req.params;
        const { siteName, workDescription, feedback } = req.body;

        const work = await Map.findOne({
            user: req.user._id,
            _id: siteId,
        });
        if (!work) {
            return res.status(404).json("現場が存在しません");
        }

        const updateData = {};
        if (siteName !== undefined) updateData.siteName = siteName;
        if (workDescription !== undefined) updateData.workDescription = workDescription;
        if (feedback !== undefined) updateData.feedback = feedback;
        const updateWork = await Map.findOneAndUpdate({
            _id: siteId,
        }, updateData);
        return res.status(200).json(updateWork);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.deleteWork = async (req, res) => {
    try {
        const { siteId } = req.params;

        const work = await Map.findOne({
            user: req.user._id,
            _id: siteId,
        });
        if (!work) {
            return res.status(404).json("現場が存在しません");
        }

        await Map.deleteOne({ _id: siteId });
        return res.status(200).json("削除しました");
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};