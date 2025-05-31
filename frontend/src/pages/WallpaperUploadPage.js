import React, { useState } from "react";

const WallpaperUploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      alert("Please select images to upload.");
      return;
    }
    alert(`${selectedFiles.length} images uploaded successfully!`);
  };

  return (
    <div className="upload-container">
      <h1>Upload Your Wallpapers</h1>
      
      {/* File Upload Input */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Upload Button */}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default WallpaperUploadPage;
