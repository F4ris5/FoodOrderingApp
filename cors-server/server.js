const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer'); // Import multer for handling multipart/form-data
const FormData = require('form-data'); // For sending form data to Freeimage.host

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: 'https://food-order-app:5000', // Restrict to specific origin
  })
);

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for image upload
app.post('/upload-image', upload.single('source'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    // Prepare form data to send to Freeimage.host
    const formData = new FormData();
    formData.append('source', req.file.buffer, req.file.originalname); // Append the file buffer and its name
    formData.append('key', '6d207e02198a847aa98d0a2a901485a5'); // Your Freeimage.host API key
    formData.append('action', 'upload');
    formData.append('format', 'json');

    // Send the form data to Freeimage.host
    const response = await axios.post('https://freeimage.host/api/1/upload', formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data); // Send back the response from Freeimage.host
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
