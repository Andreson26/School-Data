import Student from "../models/studentModel.js";
import asyncHandler from "express-async-handler";

//creeate a new student
const createStudent = asyncHandler(async (req, res) => {
  const { firstName, lastName, dateOfBirth, major, currentYear } = req.body;

  const newStudent = await Student.create({
    firstName,
    lastName,
    dateOfBirth,
    major,
    currentYear,
  });
  console.log(newStudent);
  res.status(201).json(newStudent);
});

// Get all students
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Update a student
const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, dateOfBirth, major, currentYear } = req.body;

  const student = await Student.findById(id);

  if (student) {
    student.firstName = firstName;
    student.lastName = lastName;
    student.dateOfBirth = dateOfBirth;
    student.major = major;
    student.currentYear = currentYear;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// Delete a student
const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.deleteOne();
    res.json({ message: "Student removed" });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { createStudent, getAllStudents, updateStudent, deleteStudent };
