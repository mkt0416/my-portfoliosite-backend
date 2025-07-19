
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = null;
let accessTokenExpiresAt = 0;

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
        accessTokenExpiresAt = Date.now() + data.expires_in * 1000;
        console.log(accessToken);
    } catch (err) {
        console.log(err);
    }
};

const ensureAccessToken = async () => {
    const now = Date.now();
    if (!accessToken || now >= accessTokenExpiresAt) {
        await getAccessToken();
    }
};

exports.getPopularSongs = async (req, res) => {
    await ensureAccessToken();
    try {
        const response = await fetch('https://api.spotify.com/v1/playlists/5SLPaOxQyJ8Ne9zpmTOvSe', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const jsonData = await response.json();

        const items = jsonData?.tracks?.items ?? [];
        return res.status(200).json({ items });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.getSearchSongs = async (req, res) => {
    const { q, limit = '20', offset = '0' } = req.query;

    await ensureAccessToken();
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