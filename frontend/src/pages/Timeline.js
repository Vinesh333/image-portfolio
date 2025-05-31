import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import "../styles/Timeline.css";

const Timeline = () => {
  const [revealedSteps, setRevealedSteps] = useState([]);

  const steps = [
    { year: "2023", text: "Started my photography journey" },
    { year: "2024", text: "Built my first portfolio website" },
    { year: "2025", text: "Expanding my gallery and reach" },
  ];

  const handleStepClick = (index) => {
    if (!revealedSteps.includes(index)) {
      setRevealedSteps([...revealedSteps, index]);
    }
  };

  return (
    <div className="timeline-container">
      <Link to="/contents" className="back-button">← Back to Contents</Link>
      <Link to="/" className="home-icon"><FaHome /></Link>
      <h1 className="timeline-title">My Portfolio Timeline</h1>

      <div className="timeline-body">
        <div className="timeline-left">
          {[1, 2, 3].map((n, idx) => (
            <button
              key={n}
              className={`timeline-number ${revealedSteps.includes(idx) ? "active" : ""}`}
              onClick={() => handleStepClick(idx)}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="timeline-right">
          {revealedSteps.map((stepIdx) => (
            <div key={stepIdx} className="timeline-step-container">
              <motion.div
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="falling-ball"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="timeline-text"
              >
                <strong>{steps[stepIdx].year}:</strong> {steps[stepIdx].text}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
