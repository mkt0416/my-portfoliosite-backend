
exports.getWeather = async (req, res) => {
    try {
        const city = req.query.city || "Yamagata";
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=3&aqi=no`);
        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};