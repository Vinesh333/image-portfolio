import React, { useState, useEffect } from "react";
import axios from "axios";
import FullImageBackdrop from "../components/FullImageBackdrop";
import "../App.css";
import { useNavigate } from "react-router-dom";
import "../styles/GalleryApp.css";

function GalleryApp() {
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/images");
      setGallery(res.data);
    } catch (err) {
      console.error("Fetching images failed:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Lock main screen scroll
    return () => {
      document.body.style.overflow = "auto"; // Restore scroll on unmount
    };
  }, []);

  return (
    <div
      style={{
        padding: "40px 20px",
        textAlign: "center",
        backgroundColor: "#1a1a1a", // dim dark background
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 className="magic-title"> Magic of Nature Portfolio </h1>
      <h2 className="magic-subtitle">Custom Image Gallary</h2>

      <button
        onClick={() => navigate("/welcome")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "8px 14px",
          backgroundColor: "#ffffff",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "2px 2px 8px rgba(245, 245, 245, 0.81)",
          zIndex: 1000,
        }}
      >
        ← Back
      </button>

      <div style={{ position: "relative", padding: "20px", display: "flex", justifyContent: "center" }}>
        <div
          className="gallery-container"
          style={{
            width: "85%",
            maxHeight: "500px",
            borderRadius: "15px",
            position: "relative",
            padding: "10px",
            background: "radial-gradient(circle, rgba(0, 0, 0, 0.5) 0%, rgba(40, 40, 40, 0.95) 100%)",
          }}
        >
          <div
            className="image-scroller"
            style={{
              maxHeight: "480px",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
              }}
            >
              {gallery.map((img, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    width: "220px",
                    height: "220px",
                  }}
                >
                  <img
                    src={img}
                    alt={`uploaded-${idx}`}
                    className="gallery-image"
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      cursor: "pointer",
                      objectFit: "cover",
                      display: "block",
                      border: "none",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <FullImageBackdrop imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}

export default GalleryApp;
