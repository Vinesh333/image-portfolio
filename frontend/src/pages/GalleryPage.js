import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GalleryPage.css";

const GalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  // Fetch Gallery images
  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/gallery/images");
      setGalleryImages(response.data);
    } catch (error) {
      console.error("Error fetching Gallery images:", error);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);
  

  return (
    <div className="gallery-container">
      <h1>Gallery</h1>
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <img key={index} src={image} alt={`Gallery ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
