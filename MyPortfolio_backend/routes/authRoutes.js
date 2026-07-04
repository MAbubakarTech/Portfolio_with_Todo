import express from "express";
import { signupUser } from "../controllers/Signup.js";
import { loginUser } from "../controllers/Login.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

export default router;
