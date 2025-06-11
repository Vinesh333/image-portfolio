// backend/models/HireForm.js
const mongoose = require("mongoose");

const hireFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  phone: String,
  projectType: String,
  duration: String,
  budget: String,
  comments: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HireForm", hireFormSchema);
