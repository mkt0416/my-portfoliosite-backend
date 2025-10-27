
exports.getCategories = async (req, res) => {
    try {
        const response = await fetch(
            `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${process.env.RAKUTEN_APP_ID}`
        );
        const jsonData = await response.json();
        return res.status(200).json(jsonData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.getRanking = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const response = await fetch(
            `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${process.env.RAKUTEN_APP_ID}&categoryId=${categoryId}`
        );
        const jsonData = await response.json();
        return res.status(200).json(jsonData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// キーワードでレシピ検索（カテゴリ名から間接検索）
exports.searchRecipe = async (req, res) => {
    try {
        const { keyword } = req.body;
        if (!keyword) {
            return res.status(400).json({ error: "keyword is required" });
        }

        // カテゴリ一覧を取得
        const categoryRes = await fetch(
            `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${process.env.RAKUTEN_APP_ID}`
        );
        const categoryData = await categoryRes.json();

        // 各階層データ
        const large = categoryData.result.large || [];
        const medium = categoryData.result.medium || [];
        const small = categoryData.result.small || [];

        // すべてまとめる
        const allCategories = [...large, ...medium, ...small];

        // カテゴリ名にキーワードが含まれるものを抽出
        const matched = allCategories.filter((c) => c.categoryName.includes(keyword));

        if (matched.length === 0) {
            return res.status(400).json({ result: [], message: "該当するカテゴリーがありません" });
        }

        const results = [];

        for (const cat of matched) {
            let categoryId = cat.categoryId;

            // 中カテゴリー
            if (cat.parentCategoryId && !cat.parentCategoryId.includes("-")) {
                categoryId = `${cat.parentCategoryId}-${cat.categoryId}`
            }

            // 小カテゴリー
            const parentMedium = medium.find((m) => m.categoryId === cat.parentCategoryId);
            if (parentMedium && parentMedium.parentCategoryId) {
                categoryId = `${parentMedium.parentCategoryId}-${parentMedium.categoryId}-${cat.categoryId}`
            }

            const rankingURL = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${process.env.RAKUTEN_APP_ID}&categoryId=${categoryId}`

            const rankingRes = await fetch(rankingURL);
            const rankingData = await rankingRes.json();

            if (rankingData.result && rankingData.result.length > 0) {
                results.push(...rankingData.result);
            }

            await new Promise((r) => setTimeout(r, 300));
        }

        return res.status(200).json({ result: results });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


