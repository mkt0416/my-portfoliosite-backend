
exports.getAddress = async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "lat and lon are required" });
    }
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`, {
            headers: {
                "User-Agent": process.env.APP_USER_AGENT,
            }
        });
        const jsonData = await response.json();
        return res.status(200).json(jsonData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};