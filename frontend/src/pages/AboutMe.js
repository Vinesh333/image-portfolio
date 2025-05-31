import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AboutMe.css"; // Import CSS

const AboutMe = () => {
  const navigate = useNavigate(); // Hook to navigate back

  return (
    <div className="about-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>

      <p className="author">● By: v_m_o_n</p>
      <div className="about-content">
        <h1>ABOUT ME</h1>

        {/* Image Section */}
        <div className="about-images">
          <img src="/images/photo1.jpg" alt="Photography 1" />
          <img src="/images/photo2.jpg" alt="Photography 2" />
          <img src="/images/photo3.jpg" alt="Photography 3" />
        </div>

        {/* Centered Title with White Line */}
        <div className="title-container">
          <h2>My creative vision for photography</h2>
          <div className="white-line"></div>
        </div>

        <p className="about-text">
        Photography is my way of telling stories—capturing emotion, light, and life in a single frame. I aim to reveal beauty in the ordinary and evoke feeling through every image I create.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
