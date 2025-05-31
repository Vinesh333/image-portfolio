const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Use Render's PORT or fallback

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
    const baseUrl = process.env.BASE_URL || ''; // Set if needed on Render
    const urls = files.map(file => `${baseUrl}/uploads/${file}`);
    res.json(urls);
  });
});

// Delete image
app.delete('/delete', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send('No URL provided');
  const filename = url.split('/uploads/')[1];
  if (!filename) return res.status(400).send('Invalid URL');

  const filePath = path.join(__dirname, 'uploads', filename);

  fs.unlink(filePath, err => {
    if (err) return res.status(500).send('Error deleting image');
    res.status(200).send('Image deleted');
  });
});

// -------- Serve React frontend build --------
// NOTE: Adjust path to frontend build relative to backend folder
const buildPath = path.join(__dirname, '../frontend/build');

app.use(express.static(buildPath));

// For any route not handled above, serve React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
