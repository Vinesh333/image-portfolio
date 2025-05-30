const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/gallery_uploads", express.static(path.join(__dirname, "gallery_uploads")));

// Ensure directories exist
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("gallery_uploads")) fs.mkdirSync("gallery_uploads");

// Fetch Explore Now images
app.get("/images", (req, res) => {
  const uploadsDir = path.join(__dirname, "uploads");
  fs.readdir(uploadsDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Unable to scan folder" });
    const imageUrls = files.map(file => `http://localhost:${PORT}/uploads/${file}`);
    res.json(imageUrls);
  });
});

// Fetch Gallery images
app.get("/gallery-images", (req, res) => {
  const galleryDir = path.join(__dirname, "gallery_uploads");
  fs.readdir(galleryDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Unable to scan folder" });
    const imageUrls = files.map(file => `http://localhost:${PORT}/gallery_uploads/${file}`);
    res.json(imageUrls);
  });
});

// Multer setup
const uploadExplore = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const uploadGallery = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "gallery_uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const uploadExploreNow = multer({ storage: uploadExplore });
const uploadGalleryNow = multer({ storage: uploadGallery });

// Upload to Explore Now
app.post("/upload", uploadExploreNow.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  const imageUrls = req.files.map(file => `http://localhost:${PORT}/uploads/${file.filename}`);
  res.json({ imageUrls });
});

// Upload to Gallery
app.post("/gallery-upload", uploadGalleryNow.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  const imageUrls = req.files.map(file => `http://localhost:${PORT}/gallery_uploads/${file.filename}`);
  res.json({ imageUrls });
});

// Save Hire Me Form Data to a JSON file
app.post("/hire", (req, res) => {
  const formData = req.body;
  const formFilePath = path.join(__dirname, "hire-forms.json");

  let existingData = [];
  if (fs.existsSync(formFilePath)) {
    const raw = fs.readFileSync(formFilePath);
    existingData = JSON.parse(raw);
  }

  existingData.push({ ...formData, submittedAt: new Date().toISOString() });

  fs.writeFileSync(formFilePath, JSON.stringify(existingData, null, 2));

  res.status(200).json({ message: "Form submitted and saved successfully!" });
});

// View form submissions in a basic HTML table
app.get("/view-submissions", (req, res) => {
  const filePath = path.join(__dirname, "hire-forms.json"); // ✅ FIXED filename

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Unable to read submissions.");

    let submissions;
    try {
      submissions = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).send("Error parsing submissions data.");
    }

    let tableRows = submissions
      .map(
        (entry, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${entry.name}</td>
          <td>${entry.email}</td>
          <td>${entry.company}</td>
          <td>${entry.phone}</td>
          <td>${entry.projectType}</td>
          <td>${entry.duration}</td>
          <td>${entry.budget}</td>
          <td>${entry.comments}</td>
          <td>${entry.referral}</td>
        </tr>`
      )
      .join("");

    const html = `
      <html>
        <head>
          <title>Form Submissions</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background-color: #f7f7f7;
            }
            h1 {
              text-align: center;
              color: #333;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin-top: 20px;
              background: #fff;
            }
            th, td {
              padding: 12px;
              border: 1px solid #ccc;
              text-align: left;
              font-size: 14px;
            }
            th {
              background-color: #333;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Hire Me Form Submissions</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Phone</th>
                <th>Project Type</th>
                <th>Duration</th>
                <th>Budget</th>
                <th>Comments</th>
                <th>Referral</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `;

    res.send(html);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
