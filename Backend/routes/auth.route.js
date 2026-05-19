import express from "express";

import {
  signUp,
  logIn,
  logOut,
  profile,
} from "../controllers/auth.controller.js";

import { authMiddleware }
from "../middleware/auth.middleware.js";

const router = express.Router();

// SIGNUP
router.post("/signin", signUp);

// LOGIN
router.post("/login", logIn);
  
// LOGOUT
router.post("/logout", logOut);

// PROFILE
router.get("/profile", authMiddleware, profile);

export default router;