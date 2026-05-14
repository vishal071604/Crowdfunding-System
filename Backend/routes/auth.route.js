import express from "express";
import { logIn , signUp , logOut, profile} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login",logIn);
router.post("/signin",signUp);
router.post("/logout",logOut);
router.get("/profile",authMiddleware,profile);

export default router;