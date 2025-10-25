
const { Resend } = require("resend");

exports.sendMail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "全ての項目を入力してください" });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: `${name} <onboarding@resend.dev>`,
            to: process.env.MAIL_TO,
            subject: `📩 ${subject}`,
            text: `${name}\nメール: ${email}\n\n${message}`,
        });
        return res.status(200).json({ success: "メールが送信されました" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "メール送信に失敗しました" });
    }
};

