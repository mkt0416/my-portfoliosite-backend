
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./src/api/db/connect');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is Running');
});

app.use('/', require('./src/api/routes'));

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`Server running port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();



