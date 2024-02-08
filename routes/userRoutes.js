import express from "express";
import {
  registerUser,
  authUser,
  userExist,
  logoutUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/user-exist", userExist)

export default router;
