import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date, // Date of birth field
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  currentYear: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
