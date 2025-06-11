import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HireMeForm.css";

const HireMeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    duration: "",
    budget: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/hire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      alert(result.message || "Form submitted successfully!");
      navigate("/"); // Go back home
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="hire-form-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="social-icons">
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
      <h1 className="form-title">PLAN YOUR PROJECT</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-row">
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            type="text"
            placeholder="Company/Brand Name"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            placeholder="Phone (No spaces)"
            required
          />
        </div>
        <div className="form-row">
          <input
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            type="text"
            placeholder="Project Type"
            required
          />
        </div>
        <div className="form-row">
  <input
    name="duration"
    value={formData.duration}
    onChange={handleChange}
    type="text"
    placeholder="Project Duration (e.g., 3 months)"
    required
  />
  <input
    name="budget"
    value={formData.budget}
    onChange={handleChange}
    type="text"
    placeholder="Estimated Budget (e.g., $5,000)"
    required
  />
</div>

        <div className="form-row">
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Additional Comments"
          />
        </div>
        <div className="submit-container">
          <button type="submit" className="submit-btn">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default HireMeForm;