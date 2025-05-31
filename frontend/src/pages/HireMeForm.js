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
    referral: "",
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
      navigate("/"); // Go back home or wherever
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <div className="hire-form-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h1 className="form-title">PLAN YOUR PROJECT</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Your Name" required />
          <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Your Email" required />
        </div>
        <div className="form-row">
          <input name="company" value={formData.company} onChange={handleChange} type="text" placeholder="Company/Brand Name" required />
          <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone (No spaces)" required />
        </div>
        <div className="form-row">
          <input name="projectType" value={formData.projectType} onChange={handleChange} type="text" placeholder="Project Type" required />
        </div>
        <div className="form-row">
          <select name="duration" value={formData.duration} onChange={handleChange} required>
            <option value="">Project Duration</option>
            <option>1 - 2 Months</option>
            <option>2 - 4 Months</option>
            <option>More than 4 Months</option>
          </select>
          <select name="budget" value={formData.budget} onChange={handleChange} required>
            <option value="">Estimated Budget</option>
            <option>$1,000 - $5,000</option>
            <option>$5,000 - $10,000</option>
            <option>$10,000 - $25,000</option>
          </select>
        </div>
        <div className="form-row">
          <textarea name="comments" value={formData.comments} onChange={handleChange} placeholder="Additional Comments"></textarea>
        </div>
        <div className="form-row">
          <input name="referral" value={formData.referral} onChange={handleChange} type="text" placeholder="How’d you hear about us?" />
        </div>
        <div className="submit-container">
          <button type="submit" className="submit-btn">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default HireMeForm;
