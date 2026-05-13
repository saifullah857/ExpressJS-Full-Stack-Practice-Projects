
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  department: {
    type: String,
    required: true
  },

  image: {
    type: String,
    default:"https://img.freepik.com/free-photo/young-woman-attend-courses-girl-student-studying-holding-notebooks-showing-thumb-up-approval-recommending-company-standing-blue-background_1258-70145.jpg?semt=ais_hybrid&w=740&q=80",
    set:(v)=>v===""?"https://img.freepik.com/free-photo/young-woman-attend-courses-girl-student-studying-holding-notebooks-showing-thumb-up-approval-recommending-company-standing-blue-background_1258-70145.jpg?semt=ais_hybrid&w=740&q=80":v,
  },

  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },

  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },

  collegeName: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  cgpa: {
    type: Number,
    required: true,
    min: 0,
    max: 4.0
  }
}, { timestamps: true });


const studentListing=mongoose.model("Student", studentSchema);
module.exports = studentListing;
