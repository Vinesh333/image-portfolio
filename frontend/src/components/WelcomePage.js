import React from 'react';
import { useNavigate } from "react-router-dom";
import heroImage from '../assets/hero-image.jpg';
import '../styles/WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/gallery-app");
  };

  return (
    <div className="welcome-container">
      {/* Back Button */}
      <button onClick={() => navigate("/")} className="back-button">
        ← Back
      </button>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="image-section">
          <img 
            src={heroImage} 
            alt="Salon Model" 
            className="salon-image"
          />
        </div>
        <div className="text-section">
          <h1 className="title">Be Curl, Calm, and Collected</h1>
          <p className="description">
            Looped is a salon specializing in hair that spirals, swirls, waves, whorls, loops, and curls.
          </p>
        </div>
      </div>

      {/* Decorative Sections */}
      <div className="stars top-right">✦</div>
      <div className="stars bottom-left">✦</div>

      <div className="digital-section">
        <span className="fancy-letter">D</span>igital
        <hr className="line-left" />
      </div>

      <div className="marketing-section">
        <hr className="line-right" />
        <span className="fancy-letter">M</span>arketing
      </div>

      {/* Book Your Style Button */}
      <button className="welcome-title" onClick={handleNavigate}>
        Book Your Style
      </button>
    </div>
  );
};

export default WelcomePage;
