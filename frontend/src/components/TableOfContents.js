import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/TableOfContents.css";

const contents = [
  { 
    number: "01", 
    text: "Photography is the story I fail to put into words.", 
    link: "/concept1", 
    image: "/photos/photo1.jpg",
    name: "Golden Horizon"
  },
  { 
    number: "02", 
    text: "Every picture tells a thousand words.", 
    link: "/concept2", 
    image: "/photos/photo2.jpg",
    name: "Silent Streets"
  },
  { 
    number: "03", 
    text: "Capture the moment, it lives forever.", 
    link: "/concept3", 
    image: "/photos/photo3.jpg",
    name: "Wild Essence"
  },
  { 
    number: "04", 
    text: "The best camera is the one you have with you.", 
    link: "/concept4", 
    image: "/photos/photo4.jpg",
    name: "Frozen in Time"
  }
];

const TableOfContents = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="table-container">
      {/* Back Buttons */}
      <Link to="/" className="back-button">← Back</Link>
      <Link to="/checkout" className="back-button">← Back to Checkout</Link>

      <h1 className="table-title">Table of Contents</h1>

      <div className="contents-grid">
        {contents.map((item, index) => (
          <div key={index} className="content-box" onClick={() => openImage(item)}>
            <img 
              src={item.image} 
              alt={item.name} 
              className={`content-image content-image-${index + 1}`} 
            />
            <p className="content-name">{item.name}</p>
            <p className="content-text">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Timeline Button */}
      <Link to="/timeline" className="timeline-button">Timeline →</Link>

      {/* Modal Preview */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeImage}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.image} alt={selectedImage.name} className="modal-image" />
            <p className="modal-name">{selectedImage.name}</p>
            <p className="modal-text">{selectedImage.text}</p>
            <button className="close-button" onClick={closeImage}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableOfContents;
