import React from "react";
import "../styles/FullImageBackdrop.css"; // Import component-specific CSS

const FullImageBackdrop = ({ imageUrl, onClose }) => {
  return (
    <div className="full-image-backdrop" onClick={onClose}>
      {/* Animated Background */}
      <div className="animated-background"></div>

      {/* Full-Size Image */}
      <img className="full-image" src={imageUrl} alt="full-view" />
    </div>
  );
};

export default FullImageBackdrop;
