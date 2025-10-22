
// テーマの取得
exports.getTheme = async (req, res) => {
    try {
        let allThemes = [];
        let page = 1;
        let hasNext = true;

        while (hasNext) {
            const response = await fetch(
                `https://rebrickable.com/api/v3/lego/themes/?page=${page}&page_size=100`, {
                headers: {
                    Authorization: `key ${process.env.LEGO_API_KEY}`
                },
                cache: "no-store",
            });
            const jsonData = await response.json();

            allThemes = [...allThemes, ...jsonData.results];
            hasNext = Boolean(jsonData.next);
            page++;
        }

        return res.status(200).json(allThemes);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// 個別のセットを取得
exports.getSingleSets = async (req, res) => {
    try {
        const { setNum } = req.params;
        const response = await fetch(
            `https://rebrickable.com/api/v3/lego/sets/${setNum}`, {
            headers: {
                Authorization: `key ${process.env.LEGO_API_KEY}`
            },
            cache: "no-store",
        });
        const jsonData = await response.json();
        return res.status(200).json(jsonData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// テーマからセットを取得
exports.getSets = async (req, res) => {
    try {
        const { themeId } = req.query;
        let allSets = [];
        let page = 1;
        let hasNext = true;

        while (hasNext) {
            const response = await fetch(
                `https://rebrickable.com/api/v3/lego/sets?theme_id=${themeId}&page=${page}&page_size=100`, {
                headers: {
                    Authorization: `key ${process.env.LEGO_API_KEY}`
                },
                cache: "no-store",
            });
            const jsonData = await response.json();

            allSets = [...allSets, ...jsonData.results];
            hasNext = Boolean(jsonData.next);
            page++;
        }

        return res.status(200).json(allSets);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// キーワード検索でセットを取得
exports.searchSets = async (req, res) => {
    try {
        const { keyword } = req.query;
        let searchSets = [];
        let page = 1;
        let hasNext = true;

        while (hasNext) {
            const response = await fetch(
                `https://rebrickable.com/api/v3/lego/sets?search=${encodeURIComponent(keyword)}&page=${page}&page_size=100`, {
                headers: {
                    Authorization: `key ${process.env.LEGO_API_KEY}`
                },
                cache: "no-store",
            });
            const jsonData = await response.json();

            searchSets = [...searchSets, ...jsonData.results];
            hasNext = Boolean(jsonData.next);
            page++;
        }

        return res.status(200).json(searchSets);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// テーマからミニフィグを取得
exports.getMinfigsByTheme = async (req, res) => {
    try {
        const { themeId } = req.query;
        let allSets = [];
        let allFigs = [];
        let page = 1;
        let hasNext = true;

        while (hasNext) {
            const setRes = await fetch(
                `https://rebrickable.com/api/v3/lego/sets?theme_id=${themeId}&page=${page}&page_size=100`, {
                headers: {
                    Authorization: `key ${process.env.LEGO_API_KEY}`
                },
                cache: "no-store",
            });
            const setData = await setRes.json();

            allSets = [...allSets, ...setData.results];
            hasNext = Boolean(setData.next);
            page++;
        }

        const figPromises = allSets.slice(0, 20).map(async (set) => {
            const figRes = await fetch(
                `https://rebrickable.com/api/v3/lego/sets/${set.set_num}/minifigs?page_size=100`,
                {
                    headers: {
                        Authorization: `key ${process.env.LEGO_API_KEY}`,
                    },
                    cache: "no-store",
                }
            );
            const figData = await figRes.json();
            return figData?.results || [];
        });

        const results = await Promise.all(figPromises);
        allFigs = results.flat();

        return res.status(200).json(allFigs);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// 個別のミニフィグを取得
exports.getSingleMinifigs = async (req, res) => {
    try {
        const { figNum } = req.params;
        const response = await fetch(
            `https://rebrickable.com/api/v3/lego/minifigs/${figNum}`, {
            headers: {
                Authorization: `key ${process.env.LEGO_API_KEY}`
            },
            cache: "no-store",
        });
        const jsonData = await response.json();
        return res.status(200).json(jsonData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// キーワード検索でミニフィグを取得
exports.searchFigs = async (req, res) => {
    try {
        const { keyword } = req.query;
        let searchFigs = [];
        let page = 1;
        let hasNext = true;

        while (hasNext) {
            const response = await fetch(
                `https://rebrickable.com/api/v3/lego/minifigs?search=${encodeURIComponent(keyword)}&page=${page}&page_size=100`, {
                headers: {
                    Authorization: `key ${process.env.LEGO_API_KEY}`
                },
                cache: "no-store",
            });
            const jsonData = await response.json();

            searchFigs = [...searchFigs, ...jsonData.results];
            hasNext = Boolean(jsonData.next);
            page++;
        }

        return res.status(200).json(searchFigs);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// テーマからパーツを取得
exports.getPartsByTheme = async (req, res) => {
    try {
        const { themeId } = req.query;
        let allSets = [];
        let allFigs = [];
        let page = 1;
        let hasNext = true;

        while (hasNext) {
            const setRes = await fetch(
                `https://rebrickable.com/api/v3/lego/sets?theme_id=${themeId}&page=${page}&page_size=100`, {
                headers: {
                    Authorization: `key ${process.env.LEGO_API_KEY}`
                },
                cache: "no-store",
            });
            const setData = await setRes.json();

            allSets = [...allSets, ...setData.results];
            hasNext = Boolean(setData.next);
            page++;
        }

        const figPromises = allSets.slice(0, 20).map(async (set) => {
            const figRes = await fetch(
                `https://rebrickable.com/api/v3/lego/sets/${set.set_num}/parts?page_size=100`,
                {
                    headers: {
                        Authorization: `key ${process.env.LEGO_API_KEY}`,
                    },
                    cache: "no-store",
                }
            );
            const figData = await figRes.json();
            return figData?.results || [];
        });

        const results = await Promise.all(figPromises);
        allFigs = results.flat();

        return res.status(200).json(allFigs);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// 個別のパーツを取得
exports.getSingleParts = async (req, res) => {
    try {
        const { partNum } = req.params;
        const response = await fetch(
            `https://rebrickable.com/api/v3/lego/parts/${partNum}`, {
            headers: {
                Authorization: `key ${process.env.LEGO_API_KEY}`
            },
            cache: "no-store",
        });
        const jsonData = await response.json();
        return res.status(200).json(jsonData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// キーワード検索でパーツを取得
exports.searchParts = async (req, res) => {
    try {
        const { keyword } = req.query;
        let searchParts = [];
        let page = 1;
        let hasNext = true;

        while (hasNext) {
            const response = await fetch(
                `https://rebrickable.com/api/v3/lego/parts?search=${encodeURIComponent(keyword)}&page=${page}&page_size=100`, {
                headers: {
                    Authorization: `key ${process.env.LEGO_API_KEY}`
                },
                cache: "no-store",
            });
            const jsonData = await response.json();

            searchParts = [...searchParts, ...jsonData.results];
            hasNext = Boolean(jsonData.next);
            page++;
        }

        return res.status(200).json(searchParts);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// ランダムなセット取得
exports.getRandomSets = async (req, res) => {
    try {
        const randomPage = Math.floor(Math.random() * 50) + 1;
        const response = await fetch(
            `https://rebrickable.com/api/v3/lego/sets?page=${randomPage}&page_size=20`,
            {
                headers: {
                    Authorization: `key ${process.env.LEGO_API_KEY}`,
                },
            });
        const jsonData = await response.json();
        const results = jsonData.results;
        return res.status(200).json(results);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// ランダムなミニフィグ取得
exports.getRandomFigs = async (req, res) => {
    try {
        const randomPage = Math.floor(Math.random() * 50) + 1;
        const response = await fetch(
            `https://rebrickable.com/api/v3/lego/minifigs?page=${randomPage}&page_size=20`,
            {
                headers: {
                    Authorization: `key ${process.env.LEGO_API_KEY}`,
                },
            });
        const jsonData = await response.json();
        const results = jsonData.results;
        return res.status(200).json(results);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
