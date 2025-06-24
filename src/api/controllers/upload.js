
const axios = require('axios');
const FormData = require('form-data');

const UPLOAD_PRESET = process.env.UPLOAD_PRESET;
const CLOUD_NAME = process.env.CLOUD_NAME;

exports.uploadImage = async (req, res) => {
    try {
        const formData = new FormData();
        formData.append('file', req.file.buffer, req.file.originalname);
        formData.append('upload_preset', UPLOAD_PRESET);

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
        const response = await axios.post(cloudinaryUrl, formData, {
            headers: formData.getHeaders(),
        });
        return res.status(200).json({ url: response.data.secure_url });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};