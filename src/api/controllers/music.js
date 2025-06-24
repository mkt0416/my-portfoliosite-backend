
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = null;

const getAccessToken = async () => {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
            }),
        });
        const data = await response.json();
        accessToken = data.access_token;
    } catch (err) {
        console.log(err);
    }
};

exports.getPopularSongs = async (req, res) => {
    if (!accessToken) {
        await getAccessToken();
    }
    try {
        const response = await fetch('https://api.spotify.com/v1/playlists/5SLPaOxQyJ8Ne9zpmTOvSe', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const jsonData = await response.json();
        return res.status(200).json(jsonData.tracks);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.getSearchSongs = async (req, res) => {
    const { q, limit = '20', offset = '0' } = req.query;

    if (!accessToken) {
        await getAccessToken();
    }
    try {
        const response = await fetch('https://api.spotify.com/v1/search?' +
            new URLSearchParams({
                q,
                type: 'track',
                limit,
                offset,
            }),
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
        const jsonData = await response.json();
        return res.status(200).json(jsonData.tracks);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};