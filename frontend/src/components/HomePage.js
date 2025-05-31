import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const colors = ["#00f0ff", "#ff3c00", "#39ff14", "#ff00ff", "#ffd700"];
  const slides = [
    "Capturing nature's beauty",
    "Professional photography",
    "UI/UX",
  ];

  useEffect(() => {
    // Color and slide intervals
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000);

    const slideInterval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    // Add blast effect on click
    const creatures = document.querySelectorAll('.creature');
    creatures.forEach(creature => {
      creature.addEventListener('click', function () {
        this.classList.add('blast');
        setTimeout(() => {
          this.remove();
        }, 400);
      });
    });

    return () => {
      clearInterval(colorInterval);
      clearInterval(slideInterval);
      creatures.forEach(creature => {
        creature.removeEventListener('click', () => {});
      });
    };
  }, [colors.length, slides.length]);

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">ma_gic_of_nature</div>
        <nav className="nav-links">
          <Link to="/checkout">Checkout</Link>
          <Link to="/gallery/upload">Gallery</Link>
          <Link to="/about">About Me</Link>
          <Link to="/contact">Contact</Link>
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
            <div className="sea-animals">
              <span className="creature fish">🐟</span>
              <span className="creature turtle">🐢</span>
              <span className="creature octopus">🐙</span>
              <span className="creature bubble">🫧</span>
              <span className="creature dolphin">🐬</span>
              <span className="creature crab">🦀</span>
              <span className="creature star">🌟</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Slide-in Menu */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-close" onClick={() => setMenuOpen(false)}>
          <i className="fas fa-times"></i>
        </div>

        <div className="menu-icons">
          <a
            href="https://instagram.com/ma_gic_of_nature"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a href="mailto:vineshkumarreddy123@gmail.com">
            <i className="fas fa-envelope"></i>
          </a>
          <a
            href="https://yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-globe"></i>
          </a>
        </div>

        <div className="menu-hire">
          <div className="slider-container">
            <div className="slide-text">{slides[slideIndex]}</div>
            <Link to="/hire-me-form" className="hire-me-btn">
              Hire Me
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-header">
          <h1>
            <span>The</span>
            <br />
            PixelForge
          </h1>
        </div>

        <hr className="underline" />

        <p>
          Where every pixel tells a story. Whether it's crafting dynamic websites, capturing captivating moments, or editing with precision — this is a space forged for creativity and results.
        </p>

        <div style={{
          position: "absolute",
          bottom: "30px",
          right: "30px"
        }}>
          <Link
            to="/welcome"
            className="styled-welcome-link"
            style={{
              color: colors[colorIndex],
              border: `2px solid ${colors[colorIndex]}`,
              fontFamily: "'Caveat', cursive",
              padding: "10px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: "600",
              transition: "all 0.5s ease",
              backgroundColor: "#00000080",
            }}
          >
            Welcome Page →
          </Link>
        </div>
      </main>
      
    </div>
  );
};

export default HomePage;
