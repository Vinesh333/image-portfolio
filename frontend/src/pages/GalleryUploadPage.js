import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/GalleryUploadPage.css";


const GalleryUploadPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const navigate = useNavigate();

  const fetchUploadedImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/gallery-images");
      setUploadedImages(response.data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "wallpaper.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  useEffect(() => {
    fetchUploadedImages();
  }, []);

  return (
    <div className="gallery-upload-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Serene Stills - A Photographic Tale</h2>
      
      {/* Gallery Mini Title */}
      <div className="gallery-mini-title">
        Gallery
        <div className="title-underline"></div>
      </div>

      {/* Gallery Display with Swiper */}
      <div className="gallery-display">
        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={5}
          centeredSlides={true}
          loop={true}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          className="mySwiper"
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
        >
          {uploadedImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="image-container">
                <img
                  src={image}
                  alt={`Gallery ${index}`}
                  className="clickable-image"
                  onClick={() => handleImageClick(image)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="prev-btn">{"<"}</button>
        <button className="next-btn">{">"}</button>
      </div>

      {/* Fullscreen Image View */}
      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <div className="fullscreen-content">
            <img
              src={fullscreenImage}
              alt="Fullscreen"
              className="fullscreen-image"
            />
            <button className="close-btn" onClick={closeFullscreen}>
              ✖
            </button>
            <button
              className="download-btn"
              onClick={() => handleDownload(fullscreenImage)}
            >
              ⬇ Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryUploadPage;