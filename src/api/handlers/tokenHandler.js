
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenDecode = (req) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        try {
            const dedodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            return dedodedToken;
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
};

// Jwt認証を検証するためのミドルウェア
exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const user = await User.findById(tokenDecoded.id);
        if (!user) {
            return res.status(400).json({ message: '権限がありません' });
        }
        req.user = user;
        next();
    } else {
        return res.status(400).json({ message: 'トークンがありません' });
    }
};