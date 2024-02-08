import express from "express";
import {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/studentControllers.js";

const router = express.Router();

router.get("/all", getAllStudents);
router.post("/create", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
