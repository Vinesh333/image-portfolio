import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FrontPage.css"; // Import component-specific CSS

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div className="front-page">
      {/* Back Button */}
      <button className="front-back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>🌿 Welcome to Vinesh’s Nature Gallery 🌞</h1>
      <p>Step into the magic of natural beauty, captured forever.</p>
      <button onClick={() => navigate("/gallery")}>Enter Gallery</button>
    </div>
  );
};

export default FrontPage;
