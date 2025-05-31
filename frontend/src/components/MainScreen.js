// src/components/MainScreen.js
import React from "react";
import { useNavigate } from "react-router-dom";


function MainScreen() {
  const navigate = useNavigate();

  const handleEnterGallery = () => {
    navigate("/gallery"); // Route to your GalleryApp component
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        padding: "0 20px",
      }}
    >
      <h1
        style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          color: "#00FFAB",
          textShadow: "2px 2px 8px rgba(0, 255, 171, 0.6)",
        }}
      >
        🌿 Magic of Nature 🌿
      </h1>

      <p
        style={{
          fontSize: "1.4rem",
          marginTop: "15px",
          color: "#e0e0e0",
          fontStyle: "italic",
        }}
      >
        Capturing the wild, one frame at a time.
      </p>

      <button
        onClick={handleEnterGallery}
        style={{
          marginTop: "40px",
          padding: "12px 30px",
          fontSize: "1.2rem",
          backgroundColor: "#6C63FF",
          border: "none",
          borderRadius: "30px",
          color: "white",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          boxShadow: "0 0 12px rgba(108, 99, 255, 0.5)",
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 0 18px rgba(108, 99, 255, 0.8)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 0 12px rgba(108, 99, 255, 0.5)";
        }}
      >
        Enter Gallery
      </button>
    </div>
  );
}

export default MainScreen;
