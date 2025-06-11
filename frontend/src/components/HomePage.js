import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shutterOpen, setShutterOpen] = useState(false);
  const [shutterHeight, setShutterHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef(null);
  const shutterRef = useRef(null);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const maxHeight = window.innerHeight; // max shutter height

  const colors = ["#00f0ff", "#ff3c00", "#39ff14", "#ff00ff", "#ffd700"];
  const slides = [
    "Capturing nature's beauty",
    "Professional photography",
    "UI/UX",
  ];

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000);

    const slideInterval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    const creatures = document.querySelectorAll(".creature");
    creatures.forEach((creature) => {
      creature.addEventListener("click", function () {
        this.classList.add("blast");
        setTimeout(() => {
          this.remove();
        }, 400);
      });
    });

    return () => {
      clearInterval(colorInterval);
      clearInterval(slideInterval);
      creatures.forEach((creature) => {
        creature.removeEventListener("click", () => {});
      });
    };
  }, [colors.length, slides.length]);

  // Handle clicks outside the shutter to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        shutterRef.current &&
        !shutterRef.current.contains(e.target) &&
        !dragRef.current.contains(e.target) &&
        shutterHeight > 0
      ) {
        setShutterHeight(0);
        setShutterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shutterHeight]);

  // Drag handlers
  const onDragStart = (e) => {
    setIsDragging(true);
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
    startHeight.current = shutterHeight;
    document.body.style.userSelect = "none"; // prevent text selection
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const diff = currentY - startY.current;
    let newHeight = startHeight.current + diff;

    if (newHeight < 0) newHeight = 0;
    if (newHeight > maxHeight) newHeight = maxHeight;

    setShutterHeight(newHeight);
  };

  const onDragEnd = () => {
    setIsDragging(false);
    document.body.style.userSelect = "auto";

    // Decide if shutter stays open or closed based on threshold
    if (shutterHeight > maxHeight / 2) {
      setShutterHeight(maxHeight);
      setShutterOpen(true);
    } else {
      setShutterHeight(0);
      setShutterOpen(false);
    }
  };

  // Handle arrow click to toggle shutter
  const handleArrowClick = () => {
    if (shutterHeight === 0) {
      setShutterHeight(maxHeight);
      setShutterOpen(true);
    } else {
      setShutterHeight(0);
      setShutterOpen(false);
    }
  };

  // Back button to close shutter fully
  const handleBackClick = () => {
    setShutterHeight(0);
    setShutterOpen(false);
  };

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
        {/* Show hero content only if shutter is not fully open */}
        {shutterHeight < maxHeight && (
          <>
            {/* Draggable Down Arrow */}
            <div
              className="draggable-arrow"
              ref={dragRef}
              onClick={handleArrowClick}
              onMouseDown={onDragStart}
              onTouchStart={onDragStart}
              onMouseMove={onDragMove}
              onTouchMove={onDragMove}
              onMouseUp={onDragEnd}
              onTouchEnd={onDragEnd}
              style={{
                top: shutterHeight - 20,
                left: "50%",
                transform: "translateX(-50%)",
                position: "absolute",
                zIndex: 1000,
              }}
            >
              <i className="fas fa-chevron-down"></i>
            </div>

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

            <div
              style={{
                position: "absolute",
                bottom: "30px",
                right: "30px",
              }}
            >
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
          </>
        )}

        {/* Shutter Overlay */}
        <div
          className="shutter-section"
          ref={shutterRef}
          style={{
            height: shutterHeight,
            pointerEvents: shutterHeight > 0 ? "auto" : "none",
          }}
        >
          {shutterOpen && (
            <button
              className="back-btn"
              onClick={handleBackClick}
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                padding: "10px 20px",
                backgroundColor: "#00000080",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                zIndex: 1000,
              }}
            >
              ← Back
            </button>
          )}

          {shutterHeight > 50 && (
            <div className="shutter-content">
              <h1>Hi, I'm Vinesh</h1>
              <h2>Full-Stack Developer (Java, React, Node.js)</h2>
              <p>This is my image portfolio project built with React, Node.js, and MongoDB.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;