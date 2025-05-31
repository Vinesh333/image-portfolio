import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Checkout.css";


const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-container">
      {/* Background Image */}
      <div className="checkout-content">
        {/* ART HISTORY Title (Middle-Right) */}
        <div className="checkout-title creative-title">
  <span className="creative-text">Art</span>
</div>
  <span className="portfolio-text">History</span>


        {/* Decorative Image (Below Art History) */}
        <div className="checkout-image"></div>
      </div>

      {/* Top-left Back Button */}
      <Link to="/" className="back-button">← Back</Link>

      {/* Bottom-left Date */}
      <p className="checkout-date">October 2030</p>

      {/* Bottom-right Presenter Name */}
      <p className="checkout-presenter">Presented by ....V</p>

      {/* Bottom-right Contents Button + Arrow */}
      <div className="contents-container">
        <span className="arrow">←</span>
        <button className="contents-button" onClick={() => navigate("/contents")}>
          Contents
        </button>
      </div>
    </div>
  );
};

export default Checkout;
