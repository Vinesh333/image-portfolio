import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faGlobe,
  faClock,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import "../styles/ContactMe.css";

const ContactMe = () => {
  const [dateTime, setDateTime] = useState("");
  const [isTawkLoaded, setIsTawkLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrollbars
    document.body.style.overflow = "hidden";
    
    // Draw connector lines
    const lineData = [
      { keyId: "key-C", iconId: "icon-0" },
      { keyId: "key-E", iconId: "icon-1" },
      { keyId: "key-I", iconId: "icon-2" },
      { keyId: "key-W", iconId: "icon-3" },
      { keyId: "key-L", iconId: "icon-4" },
    ];

    const svg = document.querySelector(".connector-lines");
    if (svg) {
      svg.innerHTML = "";
      lineData.forEach(({ keyId, iconId }) => {
        const keyEl = document.getElementById(keyId);
        const iconEl = document.getElementById(iconId);
        if (keyEl && iconEl) {
          const keyRect = keyEl.getBoundingClientRect();
          const iconRect = iconEl.getBoundingClientRect();
          const svgRect = svg.getBoundingClientRect();

          const x1 = keyRect.left + keyRect.width / 2 - svgRect.left;
          const y1 = keyRect.top + keyRect.height / 2 - svgRect.top;
          const x2 = iconRect.left + iconRect.width / 2 - svgRect.left;
          const y2 = iconRect.top + iconRect.height / 2 - svgRect.top;

          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", x1);
          line.setAttribute("y1", y1);
          line.setAttribute("x2", x2);
          line.setAttribute("y2", y2);
          line.setAttribute("stroke", "#00FF88");
          line.setAttribute("stroke-width", "2");
          svg.appendChild(line);
        }
      });
    }

    // Load Tawk.to script if not already loaded
    let tawkScript = document.querySelector('script[src="https://embed.tawk.to/6807235dd6f6461915758843/1ipdu49j6"]');
    if (!tawkScript) {
      tawkScript = document.createElement("script");
      tawkScript.async = true;
      tawkScript.src = "https://embed.tawk.to/6807235dd6f6461915758843/1ipdu49j6";
      tawkScript.charset = "UTF-8";
      tawkScript.setAttribute("crossorigin", "*");
      document.body.appendChild(tawkScript);
    }

    // Wait for Tawk.to to load
    tawkScript.onload = () => {
      setIsTawkLoaded(true);
      if (window.Tawk_API && window.Tawk_API.showWidget) {
        window.Tawk_API.showWidget();
      }
    };

    // Update date and time
    const now = new Date();
    const formatted = now.toLocaleString();
    setDateTime(formatted);

    // Cleanup
    return () => {
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
      document.body.style.overflow = "";
      setIsTawkLoaded(false);
    };
  }, []);

  const contactIcons = [
    { icon: faPhone, link: "tel:+917730059846" },
    { icon: faEnvelope, link: "mailto:vineshkumarreddy123@gmail.com" },
    { icon: faInstagram, link: "https://www.instagram.com/ma_gic_of_nature" },
    { icon: faGlobe, link: "https://www.soonwilllaunch.com" },
    { icon: faLocationDot, link: "#" },
  ];

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
    ["Space"],
  ];

  const openTawkChat = () => {
    if (isTawkLoaded && window.Tawk_API && window.Tawk_API.toggle) {
      window.Tawk_API.toggle();
    } else {
      console.error("Tawk.to is not loaded yet or Tawk_API is unavailable.");
      setTimeout(() => {
        if (window.Tawk_API && window.Tawk_API.toggle) {
          window.Tawk_API.toggle();
        }
      }, 1000);
    }
  };

  return (
    <div className="contact-container simple-left-style">
      <button className="back-button" onClick={() => window.history.back()}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>

      <div className="datetime-display">
        <FontAwesomeIcon icon={faClock} className="icon" />
        {dateTime}
      </div>

      <div className="contact-content">
        <div className="contact-card-3d">
          <h1 className="contact-heading">
            <em>Contact us</em>
          </h1>

          <div className="contact-section">
            <p className="label">
              <FontAwesomeIcon icon={faPhone} className="icon" /> Phone
            </p>
            <p className="detail">+91 7730059846</p>
          </div>

          <div className="contact-section">
            <p className="label">
              <FontAwesomeIcon icon={faEnvelope} className="icon" /> Email
            </p>
            <p className="detail">
              <a href="mailto:vineshkumarreddy123@gmail.com" className="contact-link">
                vineshkumarreddy123@gmail.com
              </a>
            </p>
          </div>

          <div className="contact-section">
            <p className="label">
              <FontAwesomeIcon icon={faLocationDot} className="icon" /> Address
            </p>
            <p className="detail">On Earth</p>
          </div>

          <div className="contact-section">
            <p className="label">
              <FontAwesomeIcon icon={faInstagram} className="icon" /> Instagram
            </p>
            <p className="detail">
              <a
                href="https://www.instagram.com/ma_gic_of_nature"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                @ma_gic_of_nature
              </a>
            </p>
          </div>

          <div className="contact-section">
            <p className="label">
              <FontAwesomeIcon icon={faGlobe} className="icon" /> Website
            </p>
            <p className="detail">
              <a
                href="https://www.soonwilllaunch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                www.soonwilllaunch.com
              </a>
            </p>
          </div>
        </div>

        <div className="right-content">
          <div className="icon-keyboard-wrapper">
            <svg className="connector-lines" />
            <div className="icon-flow-container">
              {contactIcons.map((item, index) => (
                <a
                  id={`icon-${index}`}
                  key={index}
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : ""}
                  className={`icon-flow-item icon-flow-item-${index}`}
                >
                  <FontAwesomeIcon icon={item.icon} className="flow-icon" />
                </a>
              ))}
            </div>

            <div className="keyboard-container">
              {keyboardRows.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                  {row.map((key, keyIndex) => (
                    <button
                      key={keyIndex}
                      id={`key-${key}`}
                      className={`keyboard-key ${key === "Space" ? "space-key" : ""}`}
                      onClick={() => console.log(`Pressed: ${key}`)}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chat-button-container">
          <button className="chat-button" onClick={openTawkChat}>
            Chat with us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;