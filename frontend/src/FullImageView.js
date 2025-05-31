// src/FullImageView.js
import React, { useEffect } from "react";

const FullImageView = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!imageUrl) return null;

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: `radial-gradient(circle at center, rgba(0, 0, 0, 0.85), #111)`,
    animation: "fadeIn 0.4s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    cursor: "zoom-out",
  };

  const imageStyle = {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "10px",
    boxShadow: "0 0 40px rgba(255, 255, 255, 0.1)",
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <div style={backdropStyle} onClick={onClose}>
      <img src={imageUrl} alt="Full Size" style={imageStyle} />
    </div>
  );
};

export default FullImageView;
