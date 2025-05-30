const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

// Create "uploads" folder if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  res.status(200).send('Image uploaded');
});

// Get all images
app.get('/images', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) return res.status(500).send('Error reading files');
    const urls = files.map(file => `http://localhost:${PORT}/uploads/${file}`);
    res.json(urls);
  });
});

// Delete image
app.delete('/delete', (req, res) => {
  const { url } = req.body;
  const filename = url.split('/uploads/')[1];
  const filePath = path.join(__dirname, 'uploads', filename);

  fs.unlink(filePath, err => {
    if (err) return res.status(500).send('Error deleting image');
    res.status(200).send('Image deleted');
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
