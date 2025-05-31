import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);

  const handleNavigate = () => {
    navigate("/gallery-app");
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="welcome-container">
      {/* Back Button */}
      <button onClick={() => navigate("/")} className="back-button">
        ← Back
      </button>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="image-section" onClick={toggleFlip}>
          <div className={`circle-image ${flipped ? 'flipped' : ''}`}>
            {/* Front and Back Views */}
            <div className="front-view"></div>
            <div className="back-view"></div>
          </div>
        </div>
        <div className="text-section">
          <h1 className="title">Be Curl, Calm, and Collected</h1>
          <p className="description">
            Looped is a salon specializing in hair that spirals, swirls, waves, whorls, loops, and curls.
          </p>
        </div>
      </div>

      {/* Book Your Style Button */}
      <button className="welcome-title" onClick={handleNavigate}>
        Book Your Style
      </button>
    </div>
  );
};

export default WelcomePage;
