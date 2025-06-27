
const router = require('express').Router();
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
    const { message } = req.body;
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        });
        return res.status(200).json({ reply: completion.choices[0].message.content });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;