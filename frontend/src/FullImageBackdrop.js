// src/FullImageBackdrop.js
import React, { useEffect } from "react";
import "./FullImageBackdrop.css";

const FullImageBackdrop = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!imageUrl) return null;

  return (
    <div className="full-image-backdrop" onClick={onClose}>
      <div className="animated-background" />
      <img
        src={imageUrl}
        alt="Full View"
        className="full-image"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
      />
    </div>
  );
};

export default FullImageBackdrop;
