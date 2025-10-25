
const nodeemailer = require("nodemailer");

exports.sendMail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "全ての項目を入力してください" });
        }

        const transporter = nodeemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const result = await transporter.sendMail({
            from: `${name} <${email}>`,
            to: process.env.MAIL_TO,
            subject: `${subject}`,
            text: `${name}\nメール: ${email}\n\n${message}`,
        });
        return res.status(200).json({ success: "メールが送信されました", result })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "メール送信に失敗しました" });
    }
};

