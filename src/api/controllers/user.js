
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const password = req.body.password;
        // パスワードの暗号化
        const hashedPassword = await bcrypt.hash(password, 8);
        // ユーザーの新規作成
        const userData = {
            ...req.body,
            password: hashedPassword,
        };
        const user = await User.create(userData);
        return res.status(201).json({ message: 'ユーザー登録成功', user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ユーザー登録失敗', err });
    }
};

exports.login = async (req, res) => {
    try {
        const { name, password } = req.body;
        // データベースからユーザーを探してくる
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({
                errors: [
                    {
                        path: 'name',
                        msg: 'ユーザー名が無効です',
                    }
                ],
            });
        }
        // パスワードの比較
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                errors: [
                    {
                        path: 'password',
                        msg: 'パスワードが無効です',
                    }
                ],
            });
        }
        // JWTの発行
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });
        return res.status(200).json({ message: 'ログイン成功', user, token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ログイン失敗', err });
    }
};