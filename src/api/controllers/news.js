
exports.getNews = async (req, res) => {
    try {
        const response = await fetch(`https://api.worldnewsapi.com/search-news?api-key=${process.env.WORLDNEWS_KEY}&source-country=jp&language=ja&number=20`);
        const jsonData = await response.json();
        return res.status(200).json(jsonData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};